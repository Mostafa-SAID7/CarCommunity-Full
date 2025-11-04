namespace CarCommunity.Application.DTOs.Car
{
    public class UpdateCarDto
    {
        public string Make { get; set; } = null!;
        public string Model { get; set; } = null!;
        public int Year { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
    }
}