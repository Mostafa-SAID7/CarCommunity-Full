using CarCommunity.Application.DTOs.Customer;
using CarCommunity.Application.Interfaces;
using CarCommunity.Domain.Entities;

namespace CarCommunity.Application.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IRepository<Customer> _customerRepository;

        public CustomerService(IRepository<Customer> customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<IEnumerable<CustomerDto>> GetAllAsync()
        {
            var customers = await _customerRepository.GetAllAsync();
            return customers.Select(c => new CustomerDto
            {
                Id = c.Id,
                FullName = c.FullName,
                Email = c.Email,
                PhoneNumber = c.PhoneNumber
            });
        }

        public async Task<CustomerDto?> GetByIdAsync(Guid id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null) return null;

            return new CustomerDto
            {
                Id = customer.Id,
                FullName = customer.FullName,
                Email = customer.Email,
                PhoneNumber = customer.PhoneNumber
            };
        }

        public async Task<CustomerDto> CreateAsync(CreateCustomerDto dto)
        {
            var customer = new Customer
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber
            };

            await _customerRepository.AddAsync(customer);

            return new CustomerDto
            {
                Id = customer.Id,
                FullName = customer.FullName,
                Email = customer.Email,
                PhoneNumber = customer.PhoneNumber
            };
        }

        public async Task<bool> UpdateAsync(Guid id, UpdateCustomerDto dto)
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null) return false;

            customer.FullName = dto.FullName;
            customer.PhoneNumber = dto.PhoneNumber;
            customer.UpdatedAt = DateTime.UtcNow;

            await _customerRepository.UpdateAsync(customer);
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null) return false;

            await _customerRepository.DeleteAsync(customer);
            return true;
        }
    }
}