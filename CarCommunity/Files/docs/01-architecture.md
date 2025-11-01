---
title: System Architecture
description: Clean architecture and modular design for AutoSphere.
---

# System Architecture

## 🧱 Clean Architecture Layers
```
Presentation (API Controllers)
    ↓
Application (Use Cases, DTOs, Validation)
    ↓
Domain (Entities, Events, Interfaces)
    ↓
Infrastructure (EF Core, Repositories, Services)
```

### 🧩 Solution Structure
```
/src
 ├── AutoSphere.Api
 ├── AutoSphere.Application
 ├── AutoSphere.Domain
 ├── AutoSphere.Infrastructure
 └── AutoSphere.Tests
```

## ⚙️ High-Level System Diagram
```
[ Angular SPA ] → [ ASP.NET Core Web API ] → [ EF Core + SQL Server ]
      ↓                       ↓
  SignalR / Web Push     Background Jobs / AI Tagging
```

## 📡 Integration Overview
| Service | Description |
|----------|-------------|
| SignalR | Real-time notifications, live feed, presence |
| Azure Blob Storage | Image & 3D model storage |
| Azure Functions / Hangfire | Background jobs for AI tagging |
| Azure App Insights | Monitoring and telemetry |
