namespace CarCommunity.Models.Dtos.Event
{
    public class UpdateEventDto
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime EventDate { get; set; }
        public string? Location { get; set; }
    }
}
