using System.Net;
using System.Text.Json;
using CarCommunity.Domain.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace CarCommunity.Api.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var response = context.Response;
            response.ContentType = "application/json";

            var errorResponse = new
            {
                success = false,
                message = "An error occurred while processing your request.",
                error = exception.Message
            };

            switch (exception)
            {
                case DomainException:
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    errorResponse = new
                    {
                        success = false,
                        message = "Domain validation error.",
                        error = exception.Message
                    };
                    break;

                case InvalidEntityStateException:
                    response.StatusCode = (int)HttpStatusCode.UnprocessableEntity;
                    errorResponse = new
                    {
                        success = false,
                        message = "Invalid entity state.",
                        error = exception.Message
                    };
                    break;

                case KeyNotFoundException:
                    response.StatusCode = (int)HttpStatusCode.NotFound;
                    errorResponse = new
                    {
                        success = false,
                        message = "Resource not found.",
                        error = exception.Message
                    };
                    break;

                case UnauthorizedAccessException:
                    response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    errorResponse = new
                    {
                        success = false,
                        message = "Unauthorized access.",
                        error = exception.Message
                    };
                    break;

                default:
                    response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    _logger.LogError(exception, "An unhandled exception occurred.");
                    break;
            }

            var result = JsonSerializer.Serialize(errorResponse);
            await response.WriteAsync(result);
        }
    }
}