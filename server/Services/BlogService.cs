using daily_blog_app.Data;
using daily_blog_app.Exceptions;
using daily_blog_app.Interfaces;
using daily_blog_app.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace daily_blog_app.Services
{
    public class BlogService : IBlogService
    {
        private readonly ApplicationDbContext _context;

        public BlogService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Post>> GetAllPostsAsync()
        {
            return await _context.Posts
                .Include(p => p.User)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<Post> GetPostBySlugAsync(string slug)
        {
            var post = await _context.Posts
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.Slug == slug);


            if (post == null)
                throw new NotFoundException("Post does not exist");

            return post;
        }

        public async Task CreatePostAsync(Post post, int userId)
        {
            post.UserId = userId;
            post.CreatedAt = DateTime.UtcNow;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Post>> GetPostsByUserAsync(int userId)
        {
            return await _context.Posts
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

    }
}