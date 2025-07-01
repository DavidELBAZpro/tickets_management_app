🎟️ Ticket Management Backend – FastAPI + SQLModel

This project is a lightweight, modern backend for a ticket management application, built with FastAPI and SQLModel 🚀. It provides RESTful endpoints to create, read, update, and delete support tickets, while ensuring clean architecture, type safety, and maintainability. Ideal for bootstrapping professional-grade FastAPI apps in minutes.

⸻

📁 Project Layout

 tickets_management_backend/
 ├── app/
 │   ├── main.py             # App entry point, FastAPI initialization
 │   ├── database.py         # Database config & session management
 │   ├── models/              # SQLModel data models
 │   ├── schemas/             # Pydantic validation schemas
 │   ├── routers/endpoints/   # API route definitions
 │   ├── crud/                # Business logic / DB interactions
 │   └── settings.py         # Config & environment
 ├── tests/                 # Unit tests (pytest)
 ├── requirements.txt        # Python package requirements
 ├── .env                    # Environment variables
 └── README.md               # You're reading it 😉


⸻

📦 Dependency Management with uv (Recommended)

The project is designed to work with uv – a fast Python package manager for modern workflows.

🧪 Installation Steps

Step	Command
1. Install dependencies	uv sync
2. Run the app	python app/main.py

👉 uv is optional – you can also use venv + pip (see below).

⸻

💡 Alternative: Use venv + pip

Step	Command
1. Create venv	python -m venv .venv
2. Activate venv	source .venv/bin/activate (or venv\Scripts\activate on Windows)
3. Install deps	pip install -r requirements.txt
4. Run the app	python app/main.py


⸻

🗄️ Database Handling with SQLModel

All database operations are handled using SQLModel, which combines the simplicity of Pydantic with the power of SQLAlchemy. Read more here 👉 https://sqlmodel.tiangolo.com

⸻

🧪 Running Tests (Pytest)

Tests are located in the /tests folder and use pytest. To execute:

python -m pytest tests/

📊 Code coverage: ~84%

⸻

🐳 Run with Docker

Step-by-step guide:

Step	Command
1. Build image	docker build -t ticket_mgmt .
2. Run container	docker run -d --name ticket_mgmt_container -p 8000:8000 ticket_mgmt

Once running, visit: http://localhost:8000

⸻

📜 Logs

Logs are stored in tickets_management_backend/logs/*.log. Check here if something goes wrong 🧐

⸻

Enjoy your ticket management backend! 🎉