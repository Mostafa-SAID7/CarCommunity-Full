using System.ComponentModel.DataAnnotations;

namespace CarCommunity.Models.Entity
{
    public class Customer
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required] public string FullName { get; set; } = null!;
        [Required] public string Email { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
