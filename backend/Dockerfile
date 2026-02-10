# --- Stage 1: Frontend Build ---
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json ./
COPY package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code and build
COPY . .
RUN npm run build


# --- Stage 2: Backend Build ---
FROM python:3.10-slim-bullseye

# Set the working directory in the container
WORKDIR /app/backend

# Install any needed packages specified in requirements.txt
COPY backend/requirements.txt .
# Install system dependencies
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application code
COPY backend/. .

# Copy the built frontend from the frontend-builder stage
COPY --from=frontend-builder /app/frontend/dist /app/dist

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Run the Uvicorn server when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]