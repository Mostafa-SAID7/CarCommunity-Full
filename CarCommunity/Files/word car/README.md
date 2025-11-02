# Rev Assist App

> A succinct tagline: *Streamline revenue operations with automated analytics and insights*  

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Architecture & Tech Stack](#architecture--tech-stack)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Local Setup](#local-setup)  
   - [Running Tests](#running-tests)  
   - [Running in Docker / Production](#running-in-docker--production)  
5. [Clean Architecture & Modules](#clean-architecture--modules)  
6. [Database & Migrations](#database--migrations)  
7. [CI / CD Pipeline](#ci--cd-pipeline)  
8. [Environment Configuration](#environment-configuration)  
9. [Deployment](#deployment)  
10. [Contributing](#contributing)  
11. [License](#license)  
12. [Contact / Maintainers](#contact--maintainers)

---

## Overview

**Rev Assist App** is designed to assist revenue operations teams by aggregating data, applying analytics, and delivering actionable insights. The system consists of a backend Web API (ASP.NET Core) and a frontend (Angular), following Clean Architecture principles to ensure maintainability, testability, and scalability.

Use cases include:

- Aggregating data from multiple sources (CRM, billing, analytics)  
- Generating revenue forecasts, dashboards, and alerts  
- Supporting role-based access and modular extensions  

---

## Features

- Multi-tenant architecture  
- Role-based authentication & authorization  
- Dashboard with charts, KPIs, and trend analyses  
- Data ingestion pipelines  
- Export / reporting (CSV / PDF)  
- Alerting & notifications  
- Extensible plugin modules  

---

## Architecture & Tech Stack

| Layer / Component           | Technology / Pattern                     |
|-----------------------------|-------------------------------------------|
| API / Application Layer     | ASP.NET Core Web API                      |
| Domain & Business Logic     | Clean Architecture (use cases, services) |
| Persistence / Infrastructure| Entity Framework Core, SQL Server         |
| Frontend                    | Angular                                   |
| Dependency Injection        | Microsoft.Extensions.DependencyInjection |
| Logging / Monitoring        | Serilog, Application Insights (optional) |
| Mapping / DTOs              | Automapper or manual mapping              |
| CI / CD                     | GitHub Actions, Azure Pipelines           |
| Hosting / Deployment        | Azure App Service, Azure SQL, Blob Storage |

---

## Getting Started

### Prerequisites

Make sure you have installed:

- [.NET SDK 7.x or later](https://dotnet.microsoft.com)  
- Node.js & npm  
- Angular CLI  
- SQL Server (local or cloud)  
- Docker (if you want containerized local run)  

### Local Setup

1. Clone this repository:  
   ```bash
   git clone https://github.com/Mostafa‑SAID7/rev-assist-app.git
   cd rev-assist-app
   ```

2. Configure environment variables (see [Environment Configuration](#environment-configuration)).

3. Run database migrations (in the backend project):  
   ```bash
   cd src/YourApiProject
   dotnet ef database update
   ```

4. Start the backend API:  
   ```bash
   dotnet run
   ```

5. Start the Angular frontend (from its project folder):  
   ```bash
   npm install
   ng serve
   ```

6. Visit the UI (typically at `http://localhost:4200`) and backend endpoints (e.g. `https://localhost:5001/api`).

### Running Tests

Backend unit / integration tests:

```bash
cd src/YourApiProject.Tests
dotnet test
```

Frontend tests:

```bash
cd src/YourAngularProject
ng test
```

### Running in Docker / Production

You can build and run via Docker:

```bash
docker-compose up --build
```

(Assumes you have a `docker-compose.yml` wiring API, Angular app, and SQL Server.)

---

## Clean Architecture & Modules

The repo is organized into these main layers:

- **Core / Domain** — Entities, Value Objects, Domain Services  
- **Application** — Use Cases (interactors), DTOs, Interfaces  
- **Infrastructure** — EF Core DbContext, Repositories, external integrations  
- **API** — Controllers, request / response models, filters, middleware  
- **Frontend** — Angular modules, components, services  

---

## Database & Migrations

- Uses **Entity Framework Core** with Code First approach  
- Migrations live under `Infrastructure/Migrations`  
- Seed data (if any) are managed via initializers  
- Schema versioning and migrations must be part of CI/CD (see pipeline scripts)  

---

## CI / CD Pipeline

The project is designed to be deployed via automated pipelines (GitHub Actions or Azure DevOps). Key stages:

1. **Build** (backend & frontend)  
2. **Run unit tests / integration tests**  
3. **Lint / code analysis / static checks**  
4. **Publish artifacts / docker images**  
5. **Deploy to staging / production environments**  
6. **Database migration / schema update**  
7. **Smoke tests / health checks**  

---

## Environment Configuration

Use environment variables or configuration files for secrets and per‑environment settings. Key settings include:

- `ConnectionStrings__DefaultConnection`  
- `Jwt__Issuer`, `Jwt__Audience`, `Jwt__Secret`  
- `Logging__Level__Default`  
- Angular environment files (`environment.ts` / `environment.prod.ts`)  
- API base URL, feedback endpoints  

---

## Deployment

For Azure deployment, you can:

1. Deploy API to **Azure App Service**  
2. Use **Azure SQL Database**  
3. Host static Angular build in **Blob Storage / Static Web App** or a VM / App Service  
4. Use **Azure Application Insights** and **Azure Monitor** for logging, metrics  
5. Use **Azure Key Vault** for secrets  
6. Automate via GitHub Actions or Azure Pipelines  

---

## Contributing

Thank you for considering contributing!

- Follow Clean Architecture / SOLID principles  
- Write unit/integration tests for new logic  
- Add meaningful comments & documentation  
- Use Pull Requests, enforce code reviews  
- Run linting / formatting before submitting  

---

## License

This project is licensed under the **MIT License**.

---

## Contact / Maintainers

- **Mostafa** — project owner / primary maintainer  
- For issues, bug reports, feature requests — use GitHub Issues  
