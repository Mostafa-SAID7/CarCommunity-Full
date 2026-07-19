# AutoSphere — Car Community Platform

Full-stack car enthusiast community platform.

## Project structure

```
CarCommunity/     ← ASP.NET Core 8 Web API (Clean Architecture)
frontend/         ← Angular 17+ SPA
docs/             ← Architecture documentation
```

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | ASP.NET Core 8, EF Core, SQL Server, Identity, JWT |
| Frontend | Angular 17+, TailwindCSS, RxJS, Angular Signals |
| Auth | JWT (HttpOnly-ready), ASP.NET Core Identity |
| Real-time | @microsoft/signalr (installed, ready to connect) |

## Running the frontend

```bash
cd frontend && npm start
# Dev server on port 4200, proxies /api/* → http://localhost:5001
```

## Running the backend

```bash
cd CarCommunity/CarCommunity.Api && dotnet run
# API on http://localhost:5001
```

Set the SQL Server connection string as the `CONNECTION_STRING` environment secret, then update `appsettings.json` to read from it before running the backend.

## User preferences

- Feature-based Angular folder structure (core / features / layouts / shared)
- Standalone Angular components throughout (no NgModules)
- Angular Signals for reactive state (no NgRx unless scope grows)
- TailwindCSS utility-first styling with custom design tokens in tailwind.config.js
- Lazy-loaded routes for all feature pages
