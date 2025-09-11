# G-Scores Backend

The **G-Scores Backend** is a Laravel-based REST API service that provides comprehensive student score management and analytics for the Vietnam National High School Graduation Examination (THPT) 2024 data.

## Overview

This backend service is part of the G-Scores project (Golden Owl Asia Assignment) and serves as the data processing engine and API provider for student examination scores. It handles data import, storage, and provides various analytical endpoints to support the frontend application.

Built with modern Laravel practices, the backend emphasizes clean architecture, performance, and scalability while providing robust APIs for score analysis and student data retrieval.

---

## Features

### Core Functionality
- **Data Import System**: Automated import of `diem_thi_thpt_2024.csv` into database using Laravel migrations and seeders
- **Score Search**: Fast lookup of student scores by registration number (SBD - Số báo danh)
- **Statistical Analysis**: Student distribution analytics across different score ranges
- **Top Performers**: Ranking system for top students by subject combinations

### API Endpoints
- **Student Score Lookup**: Search individual student results by registration number
- **Score Distribution**: Get student count distribution by score levels:
  - Excellent: ≥ 8.0
  - Good: [6.0 - 8.0)
  - Average: [4.0 - 6.0)
  - Below Average: < 4.0
- **Top 10 Rankings**: Retrieve top-performing students for Subject Group A (Math + Physics + Chemistry)

### Technical Features
- **Full OOP Architecture**: Clean, maintainable object-oriented design
- **Eloquent ORM**: Efficient database operations with Laravel's built-in ORM
- **Request Validation**: Robust input validation and sanitization
- **RESTful APIs**: Standard REST conventions for easy integration
- **Extensible Design**: Modular structure for easy feature additions

---

## Backend Folder Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       └── ScoreController.php     # Main API controller for score operations
├── Models/
│   └── Score.php                       # Eloquent model for score data

database/
├── factories/                          # Model factories for testing
├── migrations/                         # Database schema migrations
├── seeders/
│   ├── data/                           # Data files for seeding
│   ├── DatabaseSeeder.php              # Main seeder orchestrator
│   └── ScoreSeeder.php                 # Handles CSV data import and processing

routes/
├── api.php                             # API route definitions
├── web.php                             # Web routes (if any)
└── console.php                         # Artisan command routes

config/
├── app.php                             # Application configuration
├── database.php                        # Database connection settings
└── cors.php                            # CORS configuration for API

storage/
├── app/
│   └── public/                         # Public file storage
└── logs/                               # Application logs

tests/
├── Feature/                            # Feature tests for APIs
└── Unit/                               # Unit tests for models/services
```

---

## Key Components

### Models
- **Score.php**: Eloquent model representing student examination scores with relationships and query scopes

### Controllers
- **ScoreController.php**: Main API controller handling all score-related endpoints with proper error handling and response formatting

### Database
- **Migrations**: Define the database schema for storing student scores
- **Seeders**: Handle the import and processing of the CSV examination data

### API Routes
All API endpoints are prefixed with `/api/` and include:
- Student score retrieval
- Statistical distributions
- Top performer rankings

---

## Development Notes

- The backend is designed to work seamlessly with Docker containerization
- Database operations are optimized for the large dataset from the THPT 2024 examination
- API responses follow consistent JSON structure for easy frontend integration
- Error handling provides meaningful messages for debugging and user feedback

For Docker setup and deployment instructions, please refer to the main project README in the root directory.