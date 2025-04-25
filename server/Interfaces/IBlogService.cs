using daily_blog_app.Models;

namespace daily_blog_app.Interfaces
{
    public interface IBlogService
    {
        Task<AllPostsResponse> GetAllPostsAsync(int pageNumber, int pageSize);
        Task<PostDto> GetPostBySlugAsync(string slug);
        Task CreatePostAsync(Post post, int userId);
        Task<List<PostDto>> GetPostsByUserAsync(int userId);
        Task UpdatePostAsync(int postId, PostRequest request, int userId, string role);
        Task DeletePostAsync(int postId, int userId, string role);
        

    }
}