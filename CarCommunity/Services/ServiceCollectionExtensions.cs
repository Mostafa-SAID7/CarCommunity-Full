namespace CarCommunity.Services
{
public static class ServiceCollectionExtensions    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Register all custom services here
            services.AddScoped<ICarService, CarService>();
            services.AddScoped<ICustomerService, CustomerService>();
            //services.AddScoped<IPostService, PostService>();
            //services.AddScoped<IEventService, EventService>();

            return services;
        }
    }
}
