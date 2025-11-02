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