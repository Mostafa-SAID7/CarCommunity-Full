namespace CarCommunity.Services
{
    public interface IDashboardService
    {
        Task<int> GetTotalCarsAsync();
        Task<int> GetTotalCustomersAsync();
        Task<int> GetTotalPostsAsync();
        Task<int> GetTotalEventsAsync();
    }
}
