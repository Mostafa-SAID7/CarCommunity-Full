CarMaintenanceSystem/
│
├── src/
│   ├── 1.Presentation/
│   │   ├── CarMaintenance.Web.API/                    # ASP.NET Core 9 API
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.cs
│   │   │   │   ├── UsersController.cs
│   │   │   │   ├── VehiclesController.cs
│   │   │   │   ├── MaintenanceController.cs
│   │   │   │   ├── WorkshopsController.cs
│   │   │   │   ├── AppointmentsController.cs
│   │   │   │   ├── OBDController.cs
│   │   │   │   ├── AIController.cs
│   │   │   │   ├── ReportsController.cs
│   │   │   │   ├── NewsController.cs
│   │   │   │   └── SupportController.cs
│   │   │   ├── Middleware/
│   │   │   │   ├── ExceptionHandlingMiddleware.cs
│   │   │   │   ├── RequestLoggingMiddleware.cs
│   │   │   │   ├── RateLimitingMiddleware.cs
│   │   │   │   └── ApiVersioningMiddleware.cs
│   │   │   ├── Filters/
│   │   │   │   ├── ValidationFilter.cs
│   │   │   │   ├── AuthorizationFilter.cs
│   │   │   │   └── PerformanceFilter.cs
│   │   │   ├── Extensions/
│   │   │   │   ├── ServiceCollectionExtensions.cs
│   │   │   │   └── ApplicationBuilderExtensions.cs
│   │   │   ├── appsettings.json
│   │   │   ├── appsettings.Development.json
│   │   │   ├── appsettings.Production.json
│   │   │   ├── Program.cs
│   │   │   └── Dockerfile
│   │   │
│   │   └── CarMaintenance.Web.Angular/                # Angular 18 Frontend
│   │       ├── src/
│   │       │   ├── app/
│   │       │   │   ├── core/
│   │       │   │   │   ├── guards/
│   │       │   │   │   ├── interceptors/
│   │       │   │   │   ├── services/
│   │       │   │   │   └── models/
│   │       │   │   ├── shared/
│   │       │   │   │   ├── components/
│   │       │   │   │   ├── directives/
│   │       │   │   │   ├── pipes/
│   │       │   │   │   └── validators/
│   │       │   │   ├── features/
│   │       │   │   │   ├── auth/
│   │       │   │   │   ├── dashboard/
│   │       │   │   │   ├── vehicles/
│   │       │   │   │   ├── maintenance/
│   │       │   │   │   ├── workshops/
│   │       │   │   │   ├── appointments/
│   │       │   │   │   ├── reports/
│   │       │   │   │   └── profile/
│   │       │   │   └── app.routes.ts
│   │       │   ├── assets/
│   │       │   ├── environments/
│   │       │   └── index.html
│   │       ├── angular.json
│   │       ├── package.json
│   │       └── Dockerfile
│   │
│   ├── 2.Application/
│   │   └── CarMaintenance.Application/
│   │       ├── Common/
│   │       │   ├── Behaviors/
│   │       │   │   ├── ValidationBehavior.cs
│   │       │   │   ├── LoggingBehavior.cs
│   │       │   │   ├── PerformanceBehavior.cs
│   │       │   │   └── TransactionBehavior.cs
│   │       │   ├── Exceptions/
│   │       │   │   ├── ValidationException.cs
│   │       │   │   ├── NotFoundException.cs
│   │       │   │   └── BusinessException.cs
│   │       │   ├── Mappings/
│   │       │   │   └── MappingProfile.cs
│   │       │   └── Models/
│   │       │       ├── PagedResult.cs
│   │       │       ├── Result.cs
│   │       │       └── ApiResponse.cs
│   │       ├── Features/
│   │       │   ├── Auth/
│   │       │   │   ├── Commands/
│   │       │   │   │   ├── LoginCommand.cs
│   │       │   │   │   ├── RegisterCommand.cs
│   │       │   │   │   └── RefreshTokenCommand.cs
│   │       │   │   ├── Queries/
│   │       │   │   │   └── GetUserProfileQuery.cs
│   │       │   │   └── DTOs/
│   │       │   ├── Vehicles/
│   │       │   │   ├── Commands/
│   │       │   │   ├── Queries/
│   │       │   │   └── DTOs/
│   │       │   ├── Maintenance/
│   │       │   │   ├── Commands/
│   │       │   │   ├── Queries/
│   │       │   │   └── DTOs/
│   │       │   ├── Workshops/
│   │       │   │   ├── Commands/
│   │       │   │   ├── Queries/
│   │       │   │   └── DTOs/
│   │       │   ├── Appointments/
│   │       │   │   ├── Commands/
│   │       │   │   ├── Queries/
│   │       │   │   └── DTOs/
│   │       │   ├── OBD/
│   │       │   │   ├── Commands/
│   │       │   │   ├── Queries/
│   │       │   │   └── DTOs/
│   │       │   ├── AI/
│   │       │   │   ├── Commands/
│   │       │   │   ├── Queries/
│   │       │   │   └── DTOs/
│   │       │   └── Reports/
│   │       │       ├── Commands/
│   │       │       ├── Queries/
│   │       │       └── DTOs/
│   │       ├── Interfaces/
│   │       │   ├── IUnitOfWork.cs
│   │       │   ├── IEmailService.cs
│   │       │   ├── ISMSService.cs
│   │       │   ├── INotificationService.cs
│   │       │   ├── ICacheService.cs
│   │       │   ├── IFileService.cs
│   │       │   ├── IOBDService.cs
│   │       │   ├── IAIService.cs
│   │       │   └── INewsService.cs
│   │       ├── Validators/
│   │       │   ├── LoginCommandValidator.cs
│   │       │   ├── RegisterCommandValidator.cs
│   │       │   └── ... (other validators)
│   │       └── DependencyInjection.cs
│   │
│   ├── 3.Domain/
│   │   └── CarMaintenance.Domain/
│   │       ├── Entities/
│   │       │   ├── User.cs
│   │       │   ├── Role.cs
│   │       │   ├── Permission.cs
│   │       │   ├── Vehicle.cs
│   │       │   ├── VehicleMake.cs
│   │       │   ├── VehicleModel.cs
│   │       │   ├── MaintenanceRecord.cs
│   │       │   ├── Workshop.cs
│   │       │   ├── Technician.cs
│   │       │   ├── Appointment.cs
│   │       │   ├── ServiceItem.cs
│   │       │   ├── Part.cs
│   │       │   ├── Inventory.cs
│   │       │   ├── OBDReading.cs
│   │       │   ├── Alert.cs
│   │       │   ├── Notification.cs
│   │       │   ├── AIModel.cs
│   │       │   ├── Prediction.cs
│   │       │   ├── Review.cs
│   │       │   └── SupportTicket.cs
│   │       ├── Common/
│   │       │   ├── BaseEntity.cs
│   │       │   ├── IAuditableEntity.cs
│   │       │   ├── ISoftDeletable.cs
│   │       │   └── ValueObject.cs
│   │       ├── Enums/
│   │       │   ├── AppointmentStatus.cs
│   │       │   ├── MaintenanceType.cs
│   │       │   ├── AlertSeverity.cs
│   │       │   ├── NotificationType.cs
│   │       │   ├── UserRole.cs
│   │       │   └── TicketStatus.cs
│   │       ├── Events/
│   │       │   ├── VehicleRegisteredEvent.cs
│   │       │   ├── AppointmentCreatedEvent.cs
│   │       │   ├── MaintenanceCompletedEvent.cs
│   │       │   └── AlertTriggeredEvent.cs
│   │       ├── Specifications/
│   │       │   ├── VehicleSpecifications.cs
│   │       │   ├── AppointmentSpecifications.cs
│   │       │   └── MaintenanceSpecifications.cs
│   │       └── Exceptions/
│   │           ├── DomainException.cs
│   │           └── InvalidEntityStateException.cs
│   │
│   ├── 4.Infrastructure/
│   │   ├── CarMaintenance.Infrastructure.Persistence/
│   │   │   ├── Context/
│   │   │   │   ├── ApplicationDbContext.cs
│   │   │   │   └── ApplicationDbContextFactory.cs
│   │   │   ├── Configurations/
│   │   │   │   ├── UserConfiguration.cs
│   │   │   │   ├── VehicleConfiguration.cs
│   │   │   │   ├── MaintenanceConfiguration.cs
│   │   │   │   └── ... (other configurations)
│   │   │   ├── Repositories/
│   │   │   │   ├── GenericRepository.cs
│   │   │   │   ├── UserRepository.cs
│   │   │   │   ├── VehicleRepository.cs
│   │   │   │   ├── MaintenanceRepository.cs
│   │   │   │   ├── WorkshopRepository.cs
│   │   │   │   ├── AppointmentRepository.cs
│   │   │   │   └── ... (other repositories)
│   │   │   ├── UnitOfWork/
│   │   │   │   └── UnitOfWork.cs
│   │   │   ├── Migrations/
│   │   │   ├── Seeders/
│   │   │   │   ├── RoleSeeder.cs
│   │   │   │   ├── PermissionSeeder.cs
│   │   │   │   ├── VehicleMakeSeeder.cs
│   │   │   │   └── DefaultUserSeeder.cs
│   │   │   └── DependencyInjection.cs
│   │   │
│   │   ├── CarMaintenance.Infrastructure.Identity/
│   │   │   ├── Services/
│   │   │   │   ├── TokenService.cs
│   │   │   │   ├── OAuthService.cs
│   │   │   │   └── UserService.cs
│   │   │   ├── Models/
│   │   │   │   ├── ApplicationUser.cs
│   │   │   │   └── RefreshToken.cs
│   │   │   └── DependencyInjection.cs
│   │   │
│   │   ├── CarMaintenance.Infrastructure.ExternalServices/
│   │   │   ├── Services/
│   │   │   │   ├── EmailService.cs
│   │   │   │   ├── SMSService.cs
│   │   │   │   ├── PushNotificationService.cs
│   │   │   │   ├── OBDService.cs
│   │   │   │   ├── AIService.cs
│   │   │   │   ├── NewsAPIService.cs
│   │   │   │   ├── PaymentService.cs
│   │   │   │   └── FileStorageService.cs
│   │   │   ├── Models/
│   │   │   └── DependencyInjection.cs
│   │   │
│   │   └── CarMaintenance.Infrastructure.Caching/
│   │       ├── Services/
│   │       │   └── RedisCacheService.cs
│   │       └── DependencyInjection.cs
│   │
│   ├── 5.Shared/
│   │   └── CarMaintenance.Shared/
│   │       ├── Constants/
│   │       │   ├── AppConstants.cs
│   │       │   ├── CacheKeys.cs
│   │       │   └── RoleConstants.cs
│   │       ├── Helpers/
│   │       │   ├── DateHelper.cs
│   │       │   ├── PasswordHelper.cs
│   │       │   └── ValidationHelper.cs
│   │       └── Extensions/
│   │           ├── StringExtensions.cs
│   │           ├── DateTimeExtensions.cs
│   │           └── EnumExtensions.cs
│   │
│   └── 6.ML/
│       └── CarMaintenance.ML/
│           ├── Models/
│           │   ├── PredictiveMaintenanceModel.cs
│           │   ├── AnomalyDetectionModel.cs
│           │   └── CostPredictionModel.cs
│           ├── Training/
│           │   ├── DataPreprocessor.cs
│           │   ├── ModelTrainer.cs
│           │   └── ModelEvaluator.cs
│           └── Services/
│               └── MLPredictionService.cs
│
├── tests/
│   ├── UnitTests/
│   │   ├── CarMaintenance.Application.UnitTests/
│   │   │   ├── Features/
│   │   │   │   ├── Auth/
│   │   │   │   ├── Vehicles/
│   │   │   │   └── Maintenance/
│   │   │   └── Validators/
│   │   ├── CarMaintenance.Domain.UnitTests/
│   │   │   ├── Entities/
│   │   │   └── Specifications/
│   │   └── CarMaintenance.Infrastructure.UnitTests/
│   │
│   ├── IntegrationTests/
│   │   ├── CarMaintenance.API.IntegrationTests/
│   │   │   ├── Controllers/
│   │   │   ├── Fixtures/
│   │   │   └── WebApplicationFactory/
│   │   └── CarMaintenance.Infrastructure.IntegrationTests/
│   │       └── Repositories/
│   │
│   └── E2ETests/
│       └── CarMaintenance.E2E.Tests/
│           ├── Scenarios/
│           └── PageObjects/
│
├── docs/
│   ├── api/
│   │   ├── swagger.json
│   │   └── openapi.yaml
│   ├── architecture/
│   │   ├── SystemArchitecture.md
│   │   ├── DatabaseDesign.md
│   │   └── APIDesign.md
│   ├── guides/
│   │   ├── GettingStarted.md
│   │   ├── DevelopmentGuide.md
│   │   ├── DeploymentGuide.md
│   │   └── APIDocumentation.md
│   ├── word-docs/
│   │   ├── SystemAnalysis.docx
│   │   ├── TechnicalSpecifications.docx
│   │   ├── UserManual.docx
│   │   └── APIReference.docx
│   └── diagrams/
│       ├── erd.png
│       ├── architecture.png
│       └── flowcharts/
│
├── scripts/
│   ├── database/
│   │   ├── init-db.sql
│   │   ├── seed-data.sql
│   │   └── migrations.sql
│   ├── deployment/
│   │   ├── deploy-azure.sh
│   │   ├── deploy-aws.sh
│   │   └── deploy-docker.sh
│   └── utilities/
│       ├── backup-db.sh
│       └── restore-db.sh
│
├── infrastructure/
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   ├── docker-compose.override.yml
│   │   └── docker-compose.prod.yml
│   ├── kubernetes/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   ├── configmap.yaml
│   │   └── secrets.yaml
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── ci-cd/
│       ├── azure-pipelines.yml
│       ├── .github/
│       │   └── workflows/
│       │       ├── ci.yml
│       │       ├── cd.yml
│       │       └── pr-validation.yml
│       └── jenkins/
│           └── Jenkinsfile
│
├── .editorconfig
├── .gitignore
├── .dockerignore
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── CHANGELOG.md
└── CarMaintenanceSystem.sln