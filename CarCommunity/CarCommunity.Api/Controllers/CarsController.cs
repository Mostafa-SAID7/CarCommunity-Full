using CarCommunity.Application.DTOs.Car;
using CarCommunity.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarCommunity.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDto>>> GetAll()
        {
            var cars = await _carService.GetAllAsync();
            return Ok(cars);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CarDto>> GetById(Guid id)
        {
            var car = await _carService.GetByIdAsync(id);
            if (car == null)
                return NotFound();

            return Ok(car);
        }

        [HttpPost]
        public async Task<ActionResult<CarDto>> Create(CreateCarDto dto)
        {
            var car = await _carService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = car.Id }, car);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateCarDto dto)
        {
            var success = await _carService.UpdateAsync(id, dto);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _carService.DeleteAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}