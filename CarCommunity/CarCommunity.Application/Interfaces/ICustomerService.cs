using CarCommunity.Application.DTOs.Customer;

namespace CarCommunity.Application.Interfaces
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerDto>> GetAllAsync();
        Task<CustomerDto?> GetByIdAsync(Guid id);
        Task<CustomerDto> CreateAsync(CreateCustomerDto dto);
        Task<bool> UpdateAsync(Guid id, UpdateCustomerDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}