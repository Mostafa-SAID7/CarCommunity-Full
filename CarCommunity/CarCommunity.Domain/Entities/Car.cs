using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CarCommunity.Domain.Common;

namespace CarCommunity.Domain.Entities
{
    public class Car : BaseEntity, ISoftDeletable
    {
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

        // ISoftDeletable implementation
        public bool IsDeleted { get; set; }
        public string? DeletedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}