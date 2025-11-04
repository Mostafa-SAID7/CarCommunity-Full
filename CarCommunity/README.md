# CarCommunity - Car Maintenance Community Platform

A comprehensive, enterprise-grade car community platform built with ASP.NET Core and Clean Architecture principles.

## 🏗️ Architecture

This project follows **Clean Architecture** with the following layers:

```
CarCommunity/
├── CarCommunity.Api/          # Presentation Layer (ASP.NET Core Web API)
├── CarCommunity.Application/  # Application Layer (Services, DTOs, Validation)
├── CarCommunity.Domain/       # Domain Layer (Entities, Business Rules)
├── CarCommunity.Infrastructure/ # Infrastructure Layer (Data Access, External Services)
└── CarCommunity.Shared/       # Shared Layer (Utilities, Constants)
```

## 🚀 Features

### Core Features
- **User Management**: Registration, authentication with JWT tokens
- **Car Management**: CRUD operations for user vehicles
- **Customer Management**: Customer data management
- **Event Management**: Community events and gatherings
- **Post Management**: Community posts and discussions

### Technical Features
- **Clean Architecture**: Proper separation of concerns
- **Entity Framework Core**: ORM with SQL Server
- **ASP.NET Core Identity**: User authentication and authorization
- **JWT Authentication**: Secure token-based authentication
- **FluentValidation**: Input validation with business rules
- **MediatR**: CQRS pattern implementation
- **Unit of Work**: Transaction management
- **Repository Pattern**: Data access abstraction
- **Global Exception Handling**: Centralized error handling
- **Request Logging**: Comprehensive logging middleware
- **Health Checks**: Application monitoring
- **Swagger/OpenAPI**: API documentation

## 🛠️ Technologies Used

- **Backend**: ASP.NET Core 9, C# 12
- **Database**: SQL Server with Entity Framework Core
- **Authentication**: JWT Bearer Tokens, ASP.NET Core Identity
- **Validation**: FluentValidation
- **Documentation**: Swagger/OpenAPI
- **Architecture**: Clean Architecture, CQRS, Repository Pattern
- **Testing**: xUnit (ready for implementation)

## 📁 Project Structure

### CarCommunity.Api (Presentation Layer)
- Controllers for REST API endpoints
- Middleware for cross-cutting concerns
- Program.cs with service configuration
- appsettings.json with configuration

### CarCommunity.Application (Application Layer)
- DTOs for data transfer
- Application services and interfaces
- Validators for input validation
- Behaviors for MediatR pipeline

### CarCommunity.Domain (Domain Layer)
- Entity classes with business rules
- Domain enums and specifications
- Domain exceptions and interfaces
- Value objects and aggregates

### CarCommunity.Infrastructure (Infrastructure Layer)
- Entity Framework DbContext
- Repository implementations
- Unit of Work pattern
- External service integrations

### CarCommunity.Shared (Shared Layer)
- Application constants
- Utility helpers and extensions
- Common interfaces and base classes

## 🚀 Getting Started

### Prerequisites
- .NET 9 SDK
- SQL Server (LocalDB or full instance)
- Visual Studio 2022 or VS Code

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CarCommunity
   ```

2. **Restore packages**
   ```bash
   dotnet restore
   ```

3. **Update database connection**
   - Open `CarCommunity.Api/appsettings.json`
   - Update the `ConnectionStrings.DefaultConnection` if needed

4. **Run database migrations**
   ```bash
   dotnet ef database update --project CarCommunity.Api
   ```

5. **Run the application**
   ```bash
   dotnet run --project CarCommunity.Api
   ```

6. **Access the API**
   - Swagger UI: `https://localhost:5001/swagger`
   - Health Check: `https://localhost:5001/health`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/{id}` - Get car by ID
- `POST /api/cars` - Create new car
- `PUT /api/cars/{id}` - Update car
- `DELETE /api/cars/{id}` - Delete car

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer

### Events
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

## 🔧 Configuration

### JWT Settings
```json
{
  "Jwt": {
    "SecretKey": "YourSuperSecretKeyHere",
    "Issuer": "CarCommunity.Api",
    "Audience": "CarCommunity.Client",
    "ExpiryInMinutes": 60
  }
}
```

### Database Connection
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=CarCommunityDb;Trusted_Connection=True;"
  }
}
```

## 🧪 Testing

```bash
# Run all tests
dotnet test

# Run specific test project
dotnet test CarCommunity.Application.UnitTests
```

## 📊 Health Checks

The application includes health checks at `/health` endpoint that monitors:
- Database connectivity
- Application responsiveness

## 🔒 Security

- JWT token-based authentication
- Password hashing with ASP.NET Core Identity
- Input validation and sanitization
- CORS configuration (when needed)
- HTTPS enforcement

## 🚀 Deployment

### Docker
```bash
# Build Docker image
docker build -t carcommunity .

# Run with Docker Compose
docker-compose up
```

### Azure Deployment
- Ready for Azure App Service
- Azure SQL Database support
- Azure Application Insights integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using Clean Architecture principles**