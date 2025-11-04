using CarCommunity.Application.DTOs.Car;

namespace CarCommunity.Application.Interfaces
{
    public interface ICarService
    {
        Task<IEnumerable<CarDto>> GetAllAsync();
        Task<CarDto?> GetByIdAsync(Guid id);
        Task<CarDto> CreateAsync(CreateCarDto dto);
        Task<bool> UpdateAsync(Guid id, UpdateCarDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}