using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarCommunity.Domain.Entities
{
    public class Post : BaseEntity
    {
        [Required] public string Title { get; set; } = null!;
        public string? Content { get; set; }
        public string? ImageUrl { get; set; }
        public string UserId { get; set; } = null!;
        [ForeignKey("UserId")] public ApplicationUser User { get; set; } = null!;
    }
}