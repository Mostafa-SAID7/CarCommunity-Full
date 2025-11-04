namespace CarCommunity.Application.DTOs.Post
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Content { get; set; }
        public string? ImageUrl { get; set; }
        public string UserId { get; set; } = null!;
    }
}