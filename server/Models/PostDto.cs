public class PostDto
{
    public int Id { get; set; }
    public string? Slug { get; set; }
    public string? Title { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? Content { get; set; }
    public string? Excerpt { get; set; }
    public List<string>? Tags { get; set; }
    public string? Author { get; set; }
    public DateTime? ModifiedAt { get; set; }
    public string? ModifiedBy { get; set; }
    public string? ImageUrl { get; set; }

}
