# Backend - Anwariya Prototype

This directory contains the backend services for the Anwariya Prototype, built with FastAPI. It provides APIs for user management, campaigns, chat, products, billing, and analytics, including AI-driven marketing insights.

## Technologies Used

*   **FastAPI**: Web framework for building APIs.
*   **SQLAlchemy**: ORM for database interactions.
*   **Pydantic**: Data validation and settings management.
*   **Uvicorn**: ASGI server for running the FastAPI application.
*   **Google Generative AI**: For marketing insights.
*   **SQLite**: File-based database for prototyping.

## Getting Started

### Prerequisites

*   Python 3.9+
*   Docker (for containerized deployment)

### Local Development (without Docker)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Create a `.env` file:**
    Create a file named `.env` in the `backend` directory and add your `GEMINI_API_KEY` and `DATABASE_URL` (optional, defaults to SQLite).
    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    DATABASE_URL="sqlite:///./app.db" # Default if not provided
    ```
    *Note: The `.env` file is ignored by git for security reasons.*

5.  **Run the application:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The API will be accessible at `http://localhost:8000`.

## Deployment with Docker

For production or consistent deployments, it is recommended to use Docker.

1.  **Navigate to the project root directory:**
    ```bash
    cd /home/spidy/Desktop/Projects/Anwariya-Prototype/
    ```
2.  **Build the Docker image:**
    From the project root, build the backend image.
    ```bash
    docker build -t anwariya-backend-prototype -f backend/Dockerfile .
    ```
    *(The `-f backend/Dockerfile` flag specifies the Dockerfile location, and `.` specifies the build context as the current directory.)*

3.  **Run the Docker container:**

    To run the container and persist the SQLite database, you can mount a volume.
    Replace `/path/to/your/persistent/data` with an actual path on your host machine where you want to store the `app.db` file.

    ```bash
    docker run -d 
      -p 8000:8000 
      -v /path/to/your/persistent/data:/app/backend/data 
      --name anwariya-backend 
      -e GEMINI_API_KEY="YOUR_GEMINI_API_KEY" 
      -e DATABASE_URL="sqlite:///./data/app.db" 
      anwariya-backend-prototype
    ```
    *   `-d`: Run in detached mode.
    *   `-p 8000:8000`: Map container port 8000 to host port 8000.
    *   `-v /path/to/your/persistent/data:/app/backend/data`: Mount a host directory as a volume to persist the `data` directory inside the container, where `app.db` will be stored.
    *   `--name anwariya-backend`: Assign a name to your container.
    *   `-e GEMINI_API_KEY="YOUR_GEMINI_API_KEY"`: Pass your Gemini API key as an environment variable.
    *   `-e DATABASE_URL="sqlite:///./data/app.db"`: Specify the database URL to point to the persistent volume.

    The application inside the container will now use `app.db` located within the `/app/backend/data` directory, which is mapped to your host's `/path/to/your/persistent/data`.

### Important Notes for Prototyping

*   **SQLite for Prototype:** For this prototype, SQLite is used for simplicity. For a production application with multiple concurrent users, a more robust database like PostgreSQL or MySQL is recommended.
*   **Environment Variables:** Always manage sensitive information like API keys using environment variables, especially in production. Avoid committing them directly into your codebase.
*   **CORS:** The application includes CORS middleware configured for specific `localhost` origins. Adjust `allow_origins` in `main.py` as needed for your deployment environment.
