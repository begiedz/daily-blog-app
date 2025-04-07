using daily_blog_app.Models;

namespace daily_blog_app.Interfaces
{
    public interface IBlogService
    {
        Task<AllPostsResponse> GetAllPostsAsync(int pageNumber, int pageSize);
        Task<Post> GetPostBySlugAsync(string slug);
        Task CreatePostAsync(Post post, int userId);
        Task<List<Post>> GetPostsByUserAsync(int userId);

    }
}