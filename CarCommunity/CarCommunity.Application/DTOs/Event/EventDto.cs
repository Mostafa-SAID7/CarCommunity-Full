namespace CarCommunity.Application.DTOs.Event
{
    public class EventDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime EventDate { get; set; }
        public string? Location { get; set; }
    }
}