using CarCommunity.Data;
using CarCommunity.Models.Dtos.Customer;
using CarCommunity.Models.Entity;
using Microsoft.EntityFrameworkCore;
namespace CarCommunity.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly AppDbContext _context;
        public CustomerService(AppDbContext context) => _context = context;

        public async Task<IEnumerable<CustomerDto>> GetAllAsync()
        {
            return await _context.Customers
                .Select(c => new CustomerDto
                {
                    Id = c.Id,
                    FullName = c.FullName,
                    Email = c.Email,
                    PhoneNumber = c.PhoneNumber
                }).ToListAsync();
        }

        public async Task<CustomerDto?> GetByIdAsync(Guid id)
        {
            var c = await _context.Customers.FindAsync(id);
            if (c == null) return null;
            return new CustomerDto { Id = c.Id, FullName = c.FullName, Email = c.Email, PhoneNumber = c.PhoneNumber };
        }

        public async Task<CustomerDto> CreateAsync(CreateCustomerDto dto)
        {
            var customer = new Customer
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber
            };
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return new CustomerDto { Id = customer.Id, FullName = customer.FullName, Email = customer.Email, PhoneNumber = customer.PhoneNumber };
        }

        public async Task<bool> UpdateAsync(Guid id, UpdateCustomerDto dto)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null) return false;
            customer.FullName = dto.FullName;
            customer.PhoneNumber = dto.PhoneNumber;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null) return false;
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
