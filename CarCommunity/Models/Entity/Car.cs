using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarCommunity.Models.Entity
{
    public class Car
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(50)]
        public string Make { get; set; } = null!; 

        [Required]
        [MaxLength(50)]
        public string Model { get; set; } = null!; 

        [Required]
        public int Year { get; set; } 

        [MaxLength(1000)]
        public string? Description { get; set; } 

        [MaxLength(250)]
        public string? ImageUrl { get; set; } 

        [Required]
        public string UserId { get; set; } = null!;
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } = null!;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; } = null;
    }
}
