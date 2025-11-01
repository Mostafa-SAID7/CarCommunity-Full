using CarCommunity.Data;
using CarCommunity.Models.Dtos.Car;
using CarCommunity.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace CarCommunity.Services
{
    public class CarService : ICarService
    {
        private readonly AppDbContext _context;

        public CarService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CarDto>> GetAllAsync()
        {
            return await _context.Cars
                .Select(c => new CarDto
                {
                    Id = c.Id,
                    Make = c.Make,
                    Model = c.Model,
                    Year = c.Year,
                    Description = c.Description,
                    ImageUrl = c.ImageUrl,
                    UserId = c.UserId
                })
                .ToListAsync();
        }

        public async Task<CarDto?> GetByIdAsync(Guid id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return null;

            return new CarDto
            {
                Id = car.Id,
                Make = car.Make,
                Model = car.Model,
                Year = car.Year,
                Description = car.Description,
                ImageUrl = car.ImageUrl,
                UserId = car.UserId
            };
        }

        public async Task<CarDto> CreateAsync(CreateCarDto dto)
        {
            var car = new Car
            {
                Make = dto.Make,
                Model = dto.Model,
                Year = dto.Year,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,
                UserId = dto.UserId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return new CarDto
            {
                Id = car.Id,
                Make = car.Make,
                Model = car.Model,
                Year = car.Year,
                Description = car.Description,
                ImageUrl = car.ImageUrl,
                UserId = car.UserId
            };
        }

        public async Task<bool> UpdateAsync(Guid id, UpdateCarDto dto)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return false;

            car.Make = dto.Make;
            car.Model = dto.Model;
            car.Year = dto.Year;
            car.Description = dto.Description;
            car.ImageUrl = dto.ImageUrl;
            car.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return false;

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
