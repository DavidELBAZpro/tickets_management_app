# 🎟️ Tickets Management App — Fullstack Application

A complete ticket management system built with **FastAPI + SQLModel** for the backend and **React + Vite + TypeScript + Tailwind** for the frontend 🚀
This app allows you to create, manage, and monitor tickets with a clean UI and a robust backend architecture.

🌐 **Live Demo Links**

| Part        | URL                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| 💻 Frontend | [tickets-management-app.vercel.app](https://tickets-management-app-mi1i-o0sprmpl7-davidelbazpros-projects.vercel.app) |
| ⚙️ Backend  | [tickets-management-app-backend.onrender.com](https://tickets-management-app-backend.onrender.com/docs)                    |

---

## 📂 Project Structure

```bash
tickets_management_app/
│
├── Backend/                  # FastAPI + SQLModel backend
│   ├── Dockerfile
│   └── ...
│
├── Frontend/                 # React + Vite frontend
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yaml       # Unified Docker orchestration 🐳
└── README.md                 # You're here!
```

---

## 🐳 Run the Fullstack App with Docker Compose

To run both frontend and backend locally with Docker Compose:

### ✅ Prerequisites

* Docker & Docker Compose installed

### 🚀 Commands

| Step                   | Command                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| 1️⃣ Clone the repo     | `git clone https://github.com/your-username/tickets_management_app.git` |
| 2️⃣ Go to project root | `cd tickets_management_app`                                             |
| 3️⃣ Launch full app    | `docker-compose up --build`                                             |
| 4️⃣ Visit frontend     | [http://localhost:8080](http://localhost:8080)                          |
| 5️⃣ Visit backend      | [http://localhost:8000](http://localhost:8000)                          |

👉 **Note**: The backend listens on port **8000** and the frontend on **8080**.

---

## 🧱 Tech Stack

| Layer            | Tech                                 |
| ---------------- | ------------------------------------ |
| Backend          | FastAPI, SQLModel, uvicorn, SQLite   |
| Frontend         | React, TypeScript, Vite, TailwindCSS |
| API format       | RESTful                              |
| Containerization | Docker / Docker Compose              |

---

## ✨ Features

* ✅ Ticket creation, listing, updating
* 🗕️ Timestamps handled properly (Paris timezone ready 🕒)
* 🔗 Full integration between frontend & backend
* 🚀 Ready for deployment on platforms like Render / Vercel

---

## 🧲 Want to run frontend & backend separately?

You can also build and run each part individually:

### Backend

```bash
cd Backend
docker build -t ticket_mgmt .
docker run -d -p 8000:8000 ticket_mgmt
```

### Frontend

```bash
cd Frontend
docker build -t ticket_front .
docker run -d -p 8080:8080 ticket_front
```

---

## 🔐 CORS + .env Variables

Make sure your `.env` file or environment settings define:

```env
VITE_API_BASE_URL=https://tickets-management-app-backend.onrender.com
```

and that CORS is handled on the backend (already done via `CORSMiddleware`).

---

## 🛆 Deployment (Free)

| Platform          | Status | URL                                                                                             |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------- |
| Render (Backend)  | ✅ Live | [Backend API](https://tickets-management-app-backend.onrender.com)                              |
| Vercel (Frontend) | ✅ Live | [Frontend UI](https://tickets-management-app-mi1i-o0sprmpl7-davidelbazpros-projects.vercel.app) |

---

## 🤝 Contribute

You're welcome to fork this project, improve it or deploy your own version. Add a database, user authentication, search features... sky’s the limit ☁️
