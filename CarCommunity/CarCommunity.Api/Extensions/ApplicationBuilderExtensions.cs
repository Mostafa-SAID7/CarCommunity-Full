using CarCommunity.Api.Middleware;
using Microsoft.AspNetCore.Builder;

namespace CarCommunity.Api.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseCustomExceptionHandling(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ExceptionHandlingMiddleware>();
        }

        public static IApplicationBuilder UseRequestLogging(this IApplicationBuilder app)
        {
            return app.UseMiddleware<RequestLoggingMiddleware>();
        }
    }
}