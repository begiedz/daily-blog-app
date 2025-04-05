namespace daily_blog_app.Models
{
    public class PostRequest
    {
        public string Slug { get; set; }
        public string Title { get; set; }
        public string Excerpt { get; set; }
        public string Content { get; set; }
        public List<string> Tags { get; set; }
    }
}
