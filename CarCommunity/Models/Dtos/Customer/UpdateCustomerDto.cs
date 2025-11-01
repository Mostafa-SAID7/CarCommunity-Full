namespace CarCommunity.Models.Dtos.Customer
{
    public class UpdateCustomerDto
    {
        public string FullName { get; set; } = null!;
        public string? PhoneNumber { get; set; }
    }
}
