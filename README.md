# 🚀 DevOps Microservices Deployment Pipeline

An end-to-end DevOps project that demonstrates how modern applications are built, containerized, deployed, and monitored using a complete CI/CD + GitOps pipeline.

This project implements a **microservices architecture** with automated build pipelines, container registry integration, Kubernetes deployment, GitOps with Argo CD, and full observability using Prometheus and Grafana.

---

# 🏗 Architecture Overview

Developer pushes code → GitHub Actions builds Docker images → images are pushed to GitHub Container Registry → Argo CD deploys services to Kubernetes → monitoring via Prometheus & Grafana.

```
Developer
   │
   ▼
GitHub Repository
   │
   ▼
GitHub Actions (CI Pipeline)
   │
   ▼
Docker Images
   │
   ▼
GitHub Container Registry (GHCR)
   │
   ▼
Argo CD (GitOps Deployment)
   │
   ▼
Kubernetes Cluster (kind)
   │
   ├── Frontend (React)
   ├── User Service (Node.js)
   └── Task Service (Node.js)
   │
   ▼
Monitoring Stack
   ├── Prometheus
   └── Grafana
```

---

# 🧰 Tech Stack

### Frontend

* React (Vite)

### Backend

* Node.js
* Express.js

### Containerization

* Docker
* Docker Compose

### CI/CD

* GitHub Actions

### Container Registry

* GitHub Container Registry (GHCR)

### Orchestration

* Kubernetes
* kind (Kubernetes in Docker)

### GitOps

* Argo CD

### Monitoring & Observability

* Prometheus
* Grafana

---

# 📦 Microservices

### 1️⃣ User Service

Handles user management operations.

Endpoints:

```
GET /users
POST /users
GET /health
```

Runs on port:

```
5001
```

---

### 2️⃣ Task Service

Handles task management.

Endpoints:

```
GET /tasks
POST /tasks
DELETE /tasks/:id
GET /health
```

Runs on port:

```
5002
```

---

### 3️⃣ Frontend

React application that interacts with both backend services.

Runs on:

```
http://localhost:8081
```

---

# ⚙️ CI/CD Pipeline

GitHub Actions automatically performs:

1️⃣ Install dependencies
2️⃣ Build Docker images
3️⃣ Push images to GitHub Container Registry
4️⃣ Trigger deployment via Argo CD

Example workflow:

```
Push → GitHub Actions → Docker build → GHCR → Argo CD deploy
```

---

# ☸ Kubernetes Deployment

The application is deployed to a **local Kubernetes cluster using kind**.

Resources deployed:

```
Deployments
Services
Pods
NodePort networking
```

Services exposed:

```
Frontend      → localhost:8081
User Service  → localhost:30001
Task Service  → localhost:30002
```

---

# 🔄 GitOps Deployment with Argo CD

Argo CD continuously monitors the repository.

When Kubernetes manifests change:

```
Git Commit → Argo CD detects change → Cluster automatically updated
```

This eliminates manual deployment commands.

---

# 📊 Monitoring & Observability

Monitoring stack deployed using Helm:

```
kube-prometheus-stack
```

Components:

* Prometheus (metrics collection)
* Grafana (visual dashboards)
* Alertmanager
* node-exporter
* kube-state-metrics

Grafana dashboard available at:

```
http://localhost:3000
```

Default login:

```
username: admin
password: <retrieved from Kubernetes secret>
```

Metrics monitored include:

* CPU usage
* Memory usage
* Pod health
* Node health
* Kubernetes resource metrics

---

# 📂 Project Structure

```
devops-microservices-app
│
├── frontend
│   ├── src
│   └── Dockerfile
│
├── user-service
│   ├── server.js
│   └── Dockerfile
│
├── task-service
│   ├── server.js
│   └── Dockerfile
│
├── k8s
│   ├── frontend-deployment.yaml
│   ├── user-service-deployment.yaml
│   ├── task-service-deployment.yaml
│   ├── frontend-service.yaml
│   ├── user-service-service.yaml
│   └── task-service-service.yaml
│
├── .github/workflows
│   └── ci.yml
│
├── docker-compose.yml
└── README.md
```

---

# ▶️ Running the Project

### 1️⃣ Clone repository

```
git clone https://github.com/<your-username>/devops-microservices-app
cd devops-microservices-app
```

---

### 2️⃣ Run locally with Docker

```
docker-compose up --build
```

---

### 3️⃣ Create Kubernetes cluster

```
kind create cluster
```

---

### 4️⃣ Deploy services

```
kubectl apply -f k8s/
```

---

### 5️⃣ Install Argo CD

```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

---

### 6️⃣ Install monitoring stack

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
kubectl create namespace monitoring
helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring
```

---

# 🧠 Key DevOps Concepts Demonstrated

✔ Microservices Architecture
✔ Containerization with Docker
✔ CI/CD Pipelines with GitHub Actions
✔ Container Registry Integration
✔ Kubernetes Deployment
✔ GitOps with Argo CD
✔ Infrastructure Monitoring
✔ Observability with Grafana

---

# 📸 Screenshots

* GitHub Actions pipeline
  <img width="1365" height="469" alt="Screenshot 2026-03-06 230948" src="https://github.com/user-attachments/assets/582b0481-fc32-4e3d-afe5-0e84c8b04c9e" />
* Argo CD dashboard
  <img width="1349" height="601" alt="Screenshot 2026-03-06 231005" src="https://github.com/user-attachments/assets/3c8fb905-7f66-4408-8cce-4e0e332ea23c" />
* Kubernetes pods
  <img width="737" height="215" alt="Screenshot 2026-03-06 231124" src="https://github.com/user-attachments/assets/7ef2457b-07db-4096-a559-b2484a4732a5" />
* Grafana dashboards
  <img width="1365" height="515" alt="Screenshot 2026-03-06 231231" src="https://github.com/user-attachments/assets/927ae894-f607-4a36-afe1-83dddfd19f8a" />
<img width="1349" height="598" alt="Screenshot 2026-03-06 231245" src="https://github.com/user-attachments/assets/4e6f7886-4d62-4224-8054-2dcb15c7e3e0" />
<img width="1350" height="599" alt="Screenshot 2026-03-06 231310" src="https://github.com/user-attachments/assets/f20bff4b-c589-4600-b7e8-9b6f2d5adf49" />
<img width="1349" height="599" alt="Screenshot 2026-03-06 231321" src="https://github.com/user-attachments/assets/e3f97243-3bad-40ca-95d6-a70740e64c2d" />

* Running application

---

# 👨‍💻 Author

Akash Tomar
(Full-Stack Developer)

---

# ⭐ If you found this project useful, consider giving it a star!
