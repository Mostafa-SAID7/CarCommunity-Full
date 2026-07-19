# AutoSphere — Angular Frontend

Angular 17+ frontend for the AutoSphere car community platform.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 17+ (standalone components, Signals) |
| Styling | TailwindCSS 3 |
| HTTP | Angular HttpClient + functional interceptors |
| State | Angular Signals (built-in, no NgRx needed for current scope) |
| Auth | JWT stored in localStorage, `authInterceptor` on every request |
| Real-time | `@microsoft/signalr` installed (ready for hub integration) |

## Folder structure

```
src/app/
├── core/
│   ├── guards/          auth.guard, guest.guard
│   ├── interceptors/    auth.interceptor, error.interceptor
│   ├── models/          car, event, post, customer, user
│   └── services/        auth, car, event, post, customer, toast
├── features/
│   ├── auth/            login, register
│   ├── cars/            car-list, car-detail, car-form
│   ├── events/          event-list, event-form
│   ├── posts/           post-list, post-form
│   └── customers/       customer-list, customer-form
├── layouts/
│   ├── auth-layout/     Centered card layout for auth pages
│   └── main-layout/     Collapsible sidebar + topbar shell
└── shared/
    └── components/      car-card, post-card, event-card, spinner, toast
```

## Development

```bash
# Install dependencies
npm install

# Start dev server (proxies /api → http://localhost:5001)
npm start
# or
ng serve --port 4200
```

Open [http://localhost:4200](http://localhost:4200).

## Connecting to the backend

The dev server proxies all `/api/*` requests to the .NET API (default `http://localhost:5001`).  
To point to a different host, edit `src/proxy.conf.json`.

For production builds, set `apiUrl` in `src/environments/environment.production.ts`.

## Running the .NET backend alongside

```bash
# From repo root — in a separate terminal
cd CarCommunity/CarCommunity.Api
dotnet run
```

The API defaults to port 5001 in development. Apply migrations before first run:

```bash
dotnet ef database update
```

## Build for production

```bash
ng build --configuration production
# Output: dist/frontend/
```
