namespace CarCommunity.Application.DTOs.Customer
{
    public class UpdateCustomerDto
    {
        public string FullName { get; set; } = null!;
        public string? PhoneNumber { get; set; }
    }
}