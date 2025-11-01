using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarCommunity.Models.Entity
{
    public class Post
    {
        [Key] public Guid Id { get; set; } = Guid.NewGuid();
        [Required] public string Title { get; set; } = null!;
        public string? Content { get; set; }
        public string? ImageUrl { get; set; }
        public string UserId { get; set; } = null!;
        [ForeignKey("UserId")] public ApplicationUser User { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
