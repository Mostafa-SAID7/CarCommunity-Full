Build a complete ASP.NET Core Web API project for a Car Maintenance system using .NET 9, with an integrated Angular 18 frontend SPA and a separate Flutter 3.24 mobile app for iOS/Android. Include the following features and structure:

- System analysis: Overview, functional/non-functional requirements, use cases, assumptions.
- Repository design pattern with generic repository and UnitOfWork.
- Database with EF Core: Entities for Car, Owner, MaintenanceRecord, ServiceType, AppUser (Identity), ChatMessage.
- EERD diagram (text-based) and mapping with AutoMapper.
- Core features: CRUD controllers for Cars, Owners, MaintenanceRecords, ServiceTypes.
- Authentication: JWT with ASP.NET Identity, AuthController for register/login.
- Unit testing: xUnit and Moq for repositories, services, controllers; Jasmine/Karma for Angular; flutter_test for Flutter.
- API Documentation: Swagger with XML comments and JWT support.
- Notifications: Email service with MailKit, NotificationsController; push via FCM for mobile.
- Live Chat: SignalR Hub for real-time messaging, persist messages in DB.
- Localization: Resource files for multi-language support (English, Spanish), request localization middleware in backend; i18n in Angular and Flutter.
- CI/CD: GitHub Actions workflow for API (build, test, Angular build to wwwroot, Docker build/push to ACR, deploy to Azure App Service) and Flutter (build APKs/iOS apps, optional Firebase App Distribution).
- Docker: Dockerfile for multi-stage build (build Angular and copy to wwwroot, then .NET), docker-compose.yml with API, SQL Server, and Redis containers.
- Health Checks: /health endpoint checking DB.
- Logging: Serilog to console and file.
- Enhanced Features:
  - API Versioning: Using Microsoft.AspNetCore.Mvc.ApiVersioning, support v1 and v2.
  - Rate Limiting: Using AspNetCoreRateLimit, configure IP-based limiting.
  - Caching: Redis for output caching on GET endpoints.
  - Background Jobs: Hangfire for scheduled tasks, e.g., daily maintenance reminders via email/push.
  - Predictive Maintenance ML: Integrate ML.NET for binary classification to predict if maintenance is needed based on car data (e.g., mileage, age, sensor data like temperature/vibration if added). Include model training script, load model in API, add prediction endpoint.
- Frontend with Angular 18: Integrated as SPA in ClientApp folder, served by backend. Include components (Login, Register, Dashboard, CarList, CarForm, MaintenanceForm, Chat, PredictionView), services (Auth, Car, SignalRChat, Predictive), routing with guards, HttpInterceptor for auth token, Angular Material for UI, i18n for localization, NgRx for state if complex.
- Mobile App with Flutter 3.24: Separate project in mobile/ folder. Include screens (Login, Register, Dashboard, CarList, CarForm, MaintenanceForm, Chat, PredictionView), services (Auth, Car, SignalRChat, Predictive), navigation with routes, Dio for HTTP, flutter_secure_storage for tokens, signalr_netcore for chat, flutter_localizations for i18n, Provider for state management, Material 3 design, FCM for push notifications.

Provide the full documentation in Markdown format, including code snippets for key parts (e.g., Program.cs, controllers, services, Dockerfile, docker-compose.yml, CI/CD YAML, Angular app.component.ts, auth.service.ts, Flutter main.dart, auth_service.dart). Ensure clean architecture, best practices for performance/security/scalability. Use environment variables for secrets. Update docker-compose to include Redis. Enhance with any additional best practices from 2025 standards.