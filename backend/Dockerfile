# Use an official Python runtime as a parent image
FROM python:3.10-slim-buster

# Set the working directory in the container
WORKDIR /app/backend

# Install any needed packages specified in requirements.txt
COPY requirements.txt .
# Install system dependencies
RUN apt-get update --allow-release-info-change
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app/backend
COPY . .

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Run the Uvicorn server when the container launches
# Use 0.0.0.0 to make the server accessible from outside the container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
