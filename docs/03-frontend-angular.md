---
title: Frontend Architecture — Angular 17+
description: Detailed guide to the AutoSphere Angular frontend (frontend/ folder).
---

# Frontend Architecture

## Overview

The Angular 17+ frontend lives in `frontend/` alongside the `CarCommunity/` .NET solution. It is a fully standalone, feature-based application using Angular's latest patterns — standalone components, functional guards/interceptors, and Signals for reactive state.

## Folder Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/          Route guards (authGuard, guestGuard)
│   │   │   ├── interceptors/    HTTP interceptors (JWT auth, error handling)
│   │   │   ├── models/          TypeScript interfaces matching backend DTOs
│   │   │   └── services/        AuthService, CarService, EventService,
│   │   │                        PostService, CustomerService, ToastService
│   │   ├── features/
│   │   │   ├── auth/            Login + Register pages
│   │   │   ├── cars/            List, Detail, Form (modal)
│   │   │   ├── events/          List, Form (modal)
│   │   │   ├── posts/           Community feed + Post form
│   │   │   └── customers/       Table view + Customer form
│   │   ├── layouts/
│   │   │   ├── auth-layout/     Full-screen centered layout for auth
│   │   │   └── main-layout/     Sidebar + topbar shell for authenticated views
│   │   └── shared/
│   │       └── components/      CarCard, PostCard, EventCard, Spinner, Toast
│   ├── environments/            environment.ts, environment.production.ts
│   └── proxy.conf.json          Dev proxy: /api → .NET API
├── tailwind.config.js
├── angular.json
└── package.json
```

## State Management Strategy

Angular Signals are used throughout — no NgRx for the current feature scope.

- **AuthService** holds `currentUser` and `isLoggedIn` as signals.
- **Feature components** use `signal<T[]>([])` for list data, `signal(true)` for loading state.
- NgRx can be added incrementally for features requiring shared cross-feature state (e.g. cart, real-time notifications).

## Authentication Flow

1. User submits login/register form.
2. `AuthService` calls `/api/auth/login` or `/api/auth/register`.
3. On success, JWT + user info stored in `localStorage`.
4. `authInterceptor` attaches `Authorization: Bearer <token>` to every subsequent request.
5. `errorInterceptor` catches 401 → calls `auth.logout()` → redirects to login.
6. `authGuard` protects all main-layout routes. `guestGuard` prevents logged-in users from seeing auth pages.

## Backend Integration

| Angular route | Backend endpoint |
|--------------|-----------------|
| `/auth/login` | `POST /api/auth/login` |
| `/auth/register` | `POST /api/auth/register` |
| `/cars` | `GET /api/cars` |
| `/cars/:id` | `GET /api/cars/{id}` |
| `/events` | `GET /api/events` |
| `/posts` | `GET /api/posts` |
| `/customers` | `GET /api/customers` |

All models (interfaces) in `src/app/core/models/` match the backend DTOs exactly.

## Running Locally

```bash
# Terminal 1 — .NET API
cd CarCommunity/CarCommunity.Api && dotnet run
# Listens on http://localhost:5001

# Terminal 2 — Angular dev server
cd frontend && npm start
# Listens on http://localhost:4200
# Proxies /api/* → http://localhost:5001
```

## Real-time (SignalR Ready)

`@microsoft/signalr` is installed. To connect a hub, inject `HubConnection` in a service and use Angular Signals to push real-time updates into component state.

## Deployment — Azure Static Web Apps

1. Build: `ng build --configuration production`
2. Upload `dist/frontend/browser/` to Azure Static Web Apps.
3. Configure the SWA `staticwebapp.config.json` to rewrite all routes to `index.html` (SPA fallback).
4. Set the `apiUrl` in `environment.production.ts` to the Azure App Service URL.

## Extending the Frontend

- Add a feature: create `src/app/features/<name>/` with list + form components, register a lazy route in `app.routes.ts`.
- Add a service: inject `HttpClient`, call the relevant `/api/<resource>` endpoint.
- Add a guard: write a `CanActivateFn`, add to the relevant route's `canActivate` array.
