# Use the official Python image from DockerHub
FROM python:3.9

# Install system packages required by FastAPI
RUN apt-get update \
    && apt-get install -y gcc libpq-dev

# Set the working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

