namespace daily_blog_app.Models
{
    public class AllPostsResponse
    {
        public List<PostDto>? Posts { get; set; }
        public PaginationMetadata? Pagination { get; set; }

       
    }
}
