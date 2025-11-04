using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Threading.Tasks;

namespace CarCommunity.Api.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();

            // Log request
            _logger.LogInformation("HTTP {Method} {Path} started at {Time}",
                context.Request.Method,
                context.Request.Path,
                DateTime.UtcNow);

            await _next(context);

            stopwatch.Stop();

            // Log response
            _logger.LogInformation("HTTP {Method} {Path} completed with status {StatusCode} in {ElapsedMilliseconds}ms",
                context.Request.Method,
                context.Request.Path,
                context.Response.StatusCode,
                stopwatch.ElapsedMilliseconds);
        }
    }
}