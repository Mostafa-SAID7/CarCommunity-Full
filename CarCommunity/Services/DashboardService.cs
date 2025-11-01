using CarCommunity.Data;
using Microsoft.EntityFrameworkCore;

namespace CarCommunity.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly AppDbContext _context;
        public DashboardService(AppDbContext context) => _context = context;

        public async Task<int> GetTotalCarsAsync() => await _context.Cars.CountAsync();
        public async Task<int> GetTotalCustomersAsync() => await _context.Customers.CountAsync();
        public async Task<int> GetTotalPostsAsync() => await _context.Posts.CountAsync();
        public async Task<int> GetTotalEventsAsync() => await _context.Events.CountAsync();
    }
}
