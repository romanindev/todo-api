# todo-api

Simple Todo API built with Node.js, Express, and MongoDB.

This project is part of a **GitOps demo setup** using:
- Kubernetes (k3d)
- Argo CD (GitOps deployment)
- CircleCI (CI pipeline - planned)

---

## Purpose

This repository is **not a production service**.

It is a **learning-oriented project** designed to explore:
- GitOps workflows with Argo CD
- Containerized applications with Docker
- Kubernetes deployments and networking
- Service-to-database communication (MongoDB)

---

## Architecture (context)

This API is part of a multi-repo setup:

- `todo-api` → this repository (backend)
- `todo-ui` → frontend
- `infra-manifests` → Kubernetes manifests (GitOps source of truth)

Argo CD watches the `infra-manifests` repo and deploys this service into the cluster.

---

## Features

- REST API for todos
- MongoDB integration
- Health check endpoint
- Designed for Kubernetes deployment

### Endpoints

- `GET` /api/todos
- `POST` /api/todos
- `PATCH` /api/todos/:id/toggle
- `GET` /health

---

## 🧑‍💻 Local development

### 1. Install dependencies

```bash
npm install
```

### 2. Run MongoDB (Docker)
```bash
docker run -d -p 27017:27017 mongo:7
```

### 3. Start the server
```bash   
npm run dev
```

### 4. Test
```bash
curl http://localhost:3000/api/todos
```

## Docker
```bash
docker build -t todo-api:local .
```

## Kubernetes
This service is deployed via Argo CD using manifests from:

👉 `infra-manifests` repository

The API connects to MongoDB using:
```text
mongodb://mongo:27017
```

Where `mongo` is a Kubernetes Service.

## Environment variables

| Variable       | Default                     | Description                |
|:---------------|:----------------------------|:---------------------------|
| PORT	          | 3000	                       | API port                   |
| MONGO_URL	   | mongodb://localhost:27017	  | Mongo connection string    |
| MONGO_DB_NAME	 | todo	                       | Database name              |


## Tech stack
- Node.js
- Express
- TypeScript
- MongoDB
- Docker
- Kubernetes (k3d)
- Argo CD

## Notes

This project intentionally keeps things simple:

- no authentication
- no validation libraries
- minimal architecture

The goal is to focus on:
👉 infrastructure, deployment, and GitOps workflow

## Status

🚧 In progress — part of GitOps learning journey
