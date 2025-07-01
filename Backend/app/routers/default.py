import socket
from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter(
    tags=["application_details"],
    responses={
        404: {"description": "This route does not exist"}
    }
)


@router.get("/")
def homepage():
    """HTML page providing quick access to the API documentation or server information"""
    page_content = """
    <!DOCTYPE html>
    <html>
    <body>
    <h1>Welcome to the Ticket Management Application</h1>
    <ul>
      <li><a href="/docs">API Documentation</a></li>
      <li><a href="/locate">Server Information</a></li>
    </ul>
    </body>
    </html> """
    return HTMLResponse(page_content)


@router.get("/locate")
def server_info():
    """Returns details about the server hosting the application."""
    server_name = socket.gethostname()
    # server_ip = socket.gethostbyname(server_name)

    return {"server_name": server_name, "server_ip": ""}