using daily_blog_app.Models;

namespace daily_blog_app.Interfaces
{
    public interface IBlogService
    {
        Task<List<Post>> GetAllPostsAsync();
        Task<Post> GetPostBySlugAsync(string slug);
        Task CreatePostAsync(Post post, int userId);
        Task<List<Post>> GetPostsByUserAsync(int userId);

    }
}