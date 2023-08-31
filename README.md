# Todo List App

## Overview

This is a Todo List application that features both frontend and backend components. The frontend is built using React, and the backend is developed with FastAPI. 

The project also includes Docker configurations for containerization and Kubernetes manifests, although the Kubernetes deployment is still a work in progress.

### Frontend

Navigate to the `react-ai` directory and install the dependencies:

```bash
cd react-ai

npm install
```

### Backend

Navigate to the `fastapi` directory and set up the virtual environment:

```bash
cd fastapi

python3 -m venv env

source env/bin/activate

pip install -r requirements.txt
```

## Usage

### Frontend

To start the frontend server, run:

```bash
npm start
```

### Backend

To start the backend server, run:

```bash
uvicorn main:app --reload
```

## Containerization

Both frontend and backend can be containerized using Docker. Dockerfiles are provided in their respective directories.

To build the Docker images, run:

```bash
docker build -t todo-list-app-frontend ./react-ai
docker build -t todo-list-app-backend ./fastapi
```

## Kubernetes

Kubernetes manifests are provided in the `k8s` directory. Note that the Kubernetes deployment is still a work in progress.

To apply the manifests, run:

```bash
kubectl apply -f k8s/
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

