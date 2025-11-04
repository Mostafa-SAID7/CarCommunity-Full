namespace CarCommunity.Application.DTOs.Post
{
    public class UpdatePostDto
    {
        public string Title { get; set; } = null!;
        public string? Content { get; set; }
        public string? ImageUrl { get; set; }
    }
}