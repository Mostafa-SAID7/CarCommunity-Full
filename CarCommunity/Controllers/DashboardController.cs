using CarCommunity.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarCommunity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _service;
        public DashboardController(IDashboardService service) => _service = service;

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var summary = new
            {
                TotalCars = await _service.GetTotalCarsAsync(),
                TotalCustomers = await _service.GetTotalCustomersAsync(),
                TotalPosts = await _service.GetTotalPostsAsync(),
                TotalEvents = await _service.GetTotalEventsAsync()
            };
            return Ok(summary);
        }
    }

}
