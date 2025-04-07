public class PostDto
{
    public string? Slug { get; set; }
    public string? Title { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? Content { get; set; }
    public string? Excerpt { get; set; }
    public List<string>? Tags { get; set; }
    public string? Author { get; set; }
}
