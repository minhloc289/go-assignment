# Webdev Intern Assignment 3

## About

This project is Assignment 3 for the Golden Owl Asia Web Development Internship program.
It is built with a **modern full-stack architecture**, using:

* **Frontend**: React + [TailAdmin](https://tailadmin.com/) template
* **Backend**: Laravel
* **Database**: MySQL
* **Containerization**: Docker & Docker Compose for seamless setup and deployment

The goal is to provide a responsive, secure, and production-ready web application environment that can be deployed easily via [Railway](https://railway.com/).

---

## Project Structure

```
webdev-intern-assignment-3/
├── frontend/              # React + TailAdmin frontend
├── backend/               # Laravel backend
├── docker-compose.yml     # Docker Compose configuration
├── .dockerignore          # Docker ignore file
├── .env.example           # Root environment variables example
└── README.md              # Project documentation
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/GoldenOwlAsia/webdev-intern-assignment-3.git
cd webdev-intern-assignment-3
```

### 2. Configure Environment Variables

* **Root**:
  Copy `.env.example` to `.env` and configure database credentials.

* **Backend**:

  ```bash
  cd backend
  cp .env.example .env
  ```

  Ensure the `DB_*` configs match the database credentials from the root `.env`.

* **Frontend**:

  ```bash
  cd frontend
  cp .env.example .env
  ```

  Ensure the `API_BASE` points to the backend host and port (default: `http://localhost:8000`).
  If backend config is unchanged, no edits are required.

### 3. Build Docker Images

```bash
docker-compose build
```

### 4. Start Services

```bash
docker-compose up -d
```

### 5. Seed Backend Data

This will import **1 million records** from CSV into the database:

```bash
docker-compose exec backend php artisan db:seed
```

### 6. Access Application

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend API: [http://localhost:8000](http://localhost:8000)

---

## Deployment

The project is deployed using [Railway](https://railway.com/), covering frontend, backend, and database.

* **Frontend**: [Frontend](https://happy-vibrancy-production.up.railway.app/)
* **Backend API**: 
  - [Top10 Group A](https://skillful-clarity-production.up.railway.app/api/top10-group-a)
  - [Check Score](https://skillful-clarity-production.up.railway.app/api/check-score)
  - [Chart Report](https://skillful-clarity-production.up.railway.app/api/report)
---

## Demo

- 🌐 Live Demo: [https://example.com](https://example.com)
- 🎥 Video Walkthrough: [Watch on YouTube](https://youtu.be/your-demo-link)

### Screenshots

1. Homepage Screenshot
![Homepage Screenshot](https://github.com/minhloc289/go-assignment/blob/main/pictures/Homepage.png)

2. Check Score Screenshot
![Check Score Screenshot](https://github.com/minhloc289/go-assignment/blob/main/pictures/CheckScore.png)

3. Report Chart Screenshot
![Report Chart Screenshot](https://github.com/minhloc289/go-assignment/blob/main/pictures/Report.png)

4. Railway Deployment
![Railway Deployment](https://github.com/minhloc289/go-assignment/blob/main/pictures/DeploymenScreenshot.png)
---

## Development Report

1. **Frontend**
   - Integrated TailAdmin template with React.
   - Configured environment variables for API connection.

2. **Backend**
   - Set up Laravel with RESTful API.
   - Implemented data seeding (~1M records from CSV).
   - Ensured DB connection with Dockerized services.

3. **Deployment**
   - Deployed full stack (frontend, backend, database) on Railway.
