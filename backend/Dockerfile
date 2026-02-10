# --- Stage 1: Frontend Build ---
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package.json and package-lock.json first to leverage Docker cache
# These are in the parent directory relative to the backend build context
COPY ../package.json ./
COPY ../package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy main frontend files
COPY ../index.html ./
COPY ../vite.config.js ./
COPY ../eslint.config.js ./
# Copy the entire src directory
COPY ../src ./src

RUN npm run build


# --- Stage 2: Backend Build ---
FROM python:3.10-slim-bullseye

# Copy the backend directory (which is the current build context) into /app/backend
COPY . /app/backend

# Set the working directory in the container
WORKDIR /app/backend

# Install any needed packages specified in requirements.txt
COPY requirements.txt .
# Install system dependencies
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir -r requirements.txt

# Copy the built frontend from the frontend-builder stage
COPY --from=frontend-builder /app/frontend/dist /app/dist

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Run the Uvicorn server when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
