import socket
from fastapi import APIRouter, status
from fastapi.responses import HTMLResponse, JSONResponse
from sqlmodel import Session, select
from database import get_session
from app.models.ticket import Ticket
from fastapi import Depends

router = APIRouter(
    tags=["application_infos"],
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
      <li><a href="/healthz">Server HealthCheck</a></li>
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


@router.get(
    "/healthz",
    response_description="Check application and database health status.",
    responses={
        200: {
            "description": "Application is up and database is reachable.",
            "content": {
                "application/json": {
                    "example": {
                        "status": "ok",
                        "db": "connected"
                    }
                }
            }
        },
        404: {
            "description": "The requested resource was not found.",
            "content": {
                "application/json": {
                    "example": {"detail": "Not Found"}
                }
            }
        },
        500: {
            "description": "Database connection error.",
            "content": {
                "application/json": {
                    "example": {"status": "error", "db": "unreachable"}
                }
            }
        }
    }
)
def full_health(session: Session = Depends(get_session)):
    """
    Returns the health status of the application.

    Performs a lightweight SELECT query to ensure the database is reachable.
    If the query fails, the endpoint returns a 500 error with status info.
    """
    try:
        session.exec(select(Ticket)).first()
        return {"status": "ok", "db": "connected"}
    except Exception:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"status": "error", "db": "unreachable"}
        )