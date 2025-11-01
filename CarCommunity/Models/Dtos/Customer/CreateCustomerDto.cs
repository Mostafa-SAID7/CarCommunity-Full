namespace CarCommunity.Models.Dtos.Customer
{
    public class CreateCustomerDto
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? PhoneNumber { get; set; }
    }
}
