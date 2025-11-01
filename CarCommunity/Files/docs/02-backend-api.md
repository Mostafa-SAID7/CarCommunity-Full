---
title: Backend API
description: ASP.NET Core Web API architecture, endpoints, and data models.
---

# Backend API

## 🧩 Project Structure
```
AutoSphere.Api
AutoSphere.Application
AutoSphere.Domain
AutoSphere.Infrastructure
```

## 📦 Core Entities
```csharp
public class Car {
    public Guid Id { get; set; }
    public string Make { get; set; } = null!;
    public string Model { get; set; } = null!;
    public int Year { get; set; }
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
}
```

## 🧭 Controllers Example
```csharp
[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase {
    private readonly ICarService _service;
    public CarsController(ICarService service) => _service = service;

    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());
    [HttpGet("{id}")] public async Task<IActionResult> Get(Guid id) => Ok(await _service.GetByIdAsync(id));
    [Authorize][HttpPost] public async Task<IActionResult> Create(CreateCarDto dto) => Ok(await _service.CreateAsync(dto));
}
```

## ⚙️ Infrastructure
- **EF Core 8**
- **FluentValidation** for input validation
- **AutoMapper** for DTO <-> Entity mapping
- **Repository + Unit of Work pattern**

## 🔗 Example Endpoints
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/cars` | Get all cars |
| `POST` | `/api/cars` | Add a new car |
| `GET` | `/api/posts` | Get posts for feed |
| `POST` | `/api/auth/login` | Authenticate user |
