using System.ComponentModel.DataAnnotations;

namespace CarCommunity.Models.Entity
{
    public class Event
    {
        [Key] public Guid Id { get; set; } = Guid.NewGuid();
        [Required] public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime EventDate { get; set; }
        public string? Location { get; set; }
    }
}
