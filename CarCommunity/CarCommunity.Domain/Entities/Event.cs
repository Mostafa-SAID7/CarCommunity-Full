using System.ComponentModel.DataAnnotations;
using CarCommunity.Domain.Common;

namespace CarCommunity.Domain.Entities
{
    public class Event : BaseEntity, ISoftDeletable
    {
        [Required] public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime EventDate { get; set; }
        public string? Location { get; set; }

        // ISoftDeletable implementation
        public bool IsDeleted { get; set; }
        public string? DeletedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}