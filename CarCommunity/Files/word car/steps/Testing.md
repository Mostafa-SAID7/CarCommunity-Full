Unit Testing Guide
7.1 Introduction
Unit testing verifies that individual components 
(repositories, services, controllers) function correctly in isolation. 
This guide focuses on unit tests using xUnit.net as the testing framework 
and Moq for mocking dependencies. Tests ensure code reliability, catch regressions, 
and support refactoring.
Key principles:

Tests should be fast, independent, and repeatable.
Mock external dependencies (e.g., DB, HTTP calls).
Aim for high code coverage on critical paths (e.g., auth, CRUD).
Use Arrange-Act-Assert (AAA) pattern.

7.2 Setup

Create a new test project:

In Visual Studio, add a new xUnit Test Project named CarMaintenanceApi.Tests.
Reference the main project (CarMaintenanceApi).


Install NuGet packages in the test project:

xunit (testing framework)
xunit.runner.visualstudio (for test explorer)
Moq (mocking library)
Microsoft.EntityFrameworkCore.InMemory (for in-memory DB testing)
Microsoft.AspNetCore.Mvc.Testing (optional for integration tests)
Microsoft.Extensions.DependencyInjection (if needed for DI setup)


Project Structure for Tests:

textCarMaintenanceApi.Tests/
??? UnitTests/
?   ??? RepositoryTests.cs
?   ??? ServiceTests.cs
?   ??? ControllerTests.cs
?   ??? AuthTests.cs
??? CarMaintenanceApi.Tests.csproj

Configure DI in Tests:

For tests needing DbContext, use in-memory database.
Mock IUnitOfWork, UserManager, etc.



7.3 Testing Repositories
Repositories interact with the DB, so use an in-memory DbContext to test CRUD without a real database.
Example: Testing Car Repository in RepositoryTests.cs

7.4 Testing Services
Services contain business logic; mock repositories or UnitOfWork.
Example: Testing CarService in ServiceTests.cs
For AuthService, mock UserManager and SignInManager.
7.5 Testing Controllers
Controllers handle HTTP; mock services, mappers, and use ObjectResult for assertions.
Example: Testing CarsController in ControllerTests.cs
For authorized endpoints, use controller.User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, "test") })); to simulate auth.
7.6 Running and Best Practices

Run tests: Use dotnet test or Visual Studio Test Explorer.
Coverage: Use tools like Coverlet or dotCover to measure coverage (aim for 80%+).
Best Practices:

Test edge cases (nulls, invalid inputs).
Avoid testing private methods; focus on public APIs.
Integrate with CI/CD (e.g., GitHub Actions).
For integration tests, use WebApplicationFactory to test full HTTP pipeline.


Expand: Add tests for validation, exceptions, and async failures.