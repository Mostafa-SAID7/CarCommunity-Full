/src
  /CarMaintenance.Api                  # ASP.NET Core Web API + host for ClientApp static files
  /CarMaintenance.Application          # application layer: services, interfaces, DTOs
  /CarMaintenance.Domain               # domain entities, enums, value objects
  /CarMaintenance.Infrastructure       # EF Core, Repositories, Identity, Email, Hangfire, SignalR persistence
  /CarMaintenance.Shared               # shared DTOs, constants
/ClientApp                              # Angular 18 app (integrated, built into Api/wwwroot)
  /src
/tests
  /CarMaintenance.UnitTests
  /CarMaintenance.IntegrationTests
/.github/workflows
Dockerfile
docker-compose.yml
README.md

CarMaintenanceApi/
├── ClientApp/  // Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── login/login.component.ts
│   │   │   │   ├── register/register.component.ts
│   │   │   │   ├── dashboard/dashboard.component.ts
│   │   │   │   ├── car-list/car-list.component.ts
│   │   │   │   ├── car-form/car-form.component.ts
│   │   │   │   ├── maintenance-list/maintenance-list.component.ts
│   │   │   │   ├── chat/chat.component.ts
│   │   │   │   ├── prediction/prediction.component.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── car.service.ts
│   │   │   │   ├── signalr.service.ts
│   │   │   │   ├── predictive.service.ts
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   ├── models/
│   │   │   │   ├── car.model.ts
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.module.ts
│   │   ├── assets/
│   │   ├── i18n/
│   │   ├── index.html
│   │   ├── main.ts
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json
├── mobile/  // Flutter app
│   ├── lib/
│   │   ├── screens/
│   │   │   ├── login_screen.dart
│   │   │   ├── register_screen.dart
│   │   │   ├── dashboard_screen.dart
│   │   │   ├── car_list_screen.dart
│   │   │   ├── car_form_screen.dart
│   │   │   ├── maintenance_list_screen.dart
│   │   │   ├── chat_screen.dart
│   │   │   ├── prediction_screen.dart
│   │   ├── services/
│   │   │   ├── auth_service.dart
│   │   │   ├── car_service.dart
│   │   │   ├── signalr_service.dart
│   │   │   ├── predictive_service.dart
│   │   ├── models/
│   │   │   ├── car_model.dart
│   │   ├── main.dart
│   ├── pubspec.yaml
│   ├── android/
│   ├── ios/
├── Controllers/
│   ├── AuthController.cs
│   ├── CarsController.cs
│   ├── OwnersController.cs
│   ├── MaintenanceRecordsController.cs
│   ├── ServiceTypesController.cs
│   ├── NotificationsController.cs
├── Hubs/
│   ├── ChatHub.cs
├── Data/
│   └── AppDbContext.cs
├── Interfaces/
│   ├── IRepository.cs
│   ├── IUnitOfWork.cs
│   ├── IAuthService.cs
│   ├── INotificationService.cs
│   ├── IPredictiveMaintenanceService.cs
├── Models/
│   ├── AppUser.cs
│   ├── Car.cs
│   ├── Owner.cs
│   ├── MaintenanceRecord.cs
│   ├── ServiceType.cs
│   ├── ChatMessage.cs
├── DTOs/
│   ├── CarDto.cs
│   ├── OwnerDto.cs
│   ├── MaintenanceRecordDto.cs
│   ├── ServiceTypeDto.cs
│   ├── LoginDto.cs
│   ├── RegisterDto.cs
│   ├── TokenDto.cs
│   ├── ChatMessageDto.cs
│   ├── NotificationDto.cs
├── Repositories/
│   ├── Repository.cs
│   ├── UnitOfWork.cs
├── Services/
│   ├── AuthService.cs
│   ├── CarService.cs
│   ├── NotificationService.cs
│   ├── PredictiveMaintenanceService.cs
├── Profiles/
│   └── MappingProfile.cs
├── Resources/
│   ├── AppResources.resx
│   ├── AppResources.es.resx
├── .github/workflows/
│   └── ci-cd.yml
├── Dockerfile
├── docker-compose.yml
├── Program.cs
├── appsettings.json
└── CarMaintenanceApi.csproj