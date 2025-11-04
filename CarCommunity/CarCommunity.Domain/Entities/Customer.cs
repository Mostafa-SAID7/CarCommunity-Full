using System.ComponentModel.DataAnnotations;

namespace CarCommunity.Domain.Entities
{
    public class Customer : BaseEntity
    {
        [Required] public string FullName { get; set; } = null!;
        [Required] public string Email { get; set; } = null!;
        public string? PhoneNumber { get; set; }
    }
}