using CarCommunity.Application.DTOs.Car;
using CarCommunity.Application.Interfaces;
using CarCommunity.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarCommunity.Application.Services
{
    public class CarService : ICarService
    {
        private readonly IRepository<Car> _carRepository;

        public CarService(IRepository<Car> carRepository)
        {
            _carRepository = carRepository;
        }

        public async Task<IEnumerable<CarDto>> GetAllAsync()
        {
            var cars = await _carRepository.GetAllAsync();
            return cars.Select(c => new CarDto
            {
                Id = c.Id,
                Make = c.Make,
                Model = c.Model,
                Year = c.Year,
                Description = c.Description,
                ImageUrl = c.ImageUrl,
                UserId = c.UserId
            });
        }

        public async Task<CarDto?> GetByIdAsync(Guid id)
        {
            var car = await _carRepository.GetByIdAsync(id);
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
                UserId = dto.UserId
            };

            await _carRepository.AddAsync(car);

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
            var car = await _carRepository.GetByIdAsync(id);
            if (car == null) return false;

            car.Make = dto.Make;
            car.Model = dto.Model;
            car.Year = dto.Year;
            car.Description = dto.Description;
            car.ImageUrl = dto.ImageUrl;
            car.UpdatedAt = DateTime.UtcNow;

            await _carRepository.UpdateAsync(car);
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var car = await _carRepository.GetByIdAsync(id);
            if (car == null) return false;

            await _carRepository.DeleteAsync(car);
            return true;
        }
    }
}