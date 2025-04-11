using daily_blog_app.Data;
using daily_blog_app.Exceptions;
using daily_blog_app.Interfaces;
using daily_blog_app.Models;
using Microsoft.EntityFrameworkCore;
using daily_blog_app.Helpers;

namespace daily_blog_app.Services
{
    public class BlogService : IBlogService
    {
        private readonly ApplicationDbContext _context;

        public BlogService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AllPostsResponse> GetAllPostsAsync(int pageNumber, int pageSize)
        {
            var totalItems = await _context.Posts.CountAsync();
            var posts = await _context.Posts
                .Include(p => p.User)
                .OrderByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PostDto
                {   
                    Id = p.Id,
                    Slug = p.Slug,
                    Title = p.Title,
                    Excerpt = p.Excerpt,
                    Content = p.Content,
                    Tags = p.Tags,
                    CreatedAt = p.CreatedAt,
                    Author = p.User.Name,
                    ModifiedAt = p.ModifiedAt,
                    ModifiedBy = p.ModifiedBy,
                    ImageUrl = p.ImageUrl
                })
                .ToListAsync();

            var pagination = new PaginationMetadata(totalItems, pageSize, pageSize);

            return new AllPostsResponse
            {
                Posts = posts,
                Pagination = pagination
            };
        }


        public async Task<PostDto> GetPostBySlugAsync(string slug)
        {
            var post = await _context.Posts
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Slug == slug);

            if (post == null)
                throw new NotFoundException("Post does not exist");

            return new PostDto
            {
                Id = post.Id,
                Slug = post.Slug,
                Title = post.Title,
                CreatedAt = post.CreatedAt,
                Content = post.Content,
                Excerpt = post.Excerpt,
                Tags = post.Tags,
                Author = post.User.Name,
                ModifiedAt = post.ModifiedAt,
                ModifiedBy = post.ModifiedBy,
                ImageUrl = post.ImageUrl
            };
        }


        public async Task CreatePostAsync(Post post, int userId)
        {
            post.UserId = userId;
            post.CreatedAt = DateTime.UtcNow;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
        }

        public async Task<List<PostDto>> GetPostsByUserAsync(int userId)
        {
            var posts = await _context.Posts
                .Include(p => p.User)
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return posts.Select(p => new PostDto
            {
                Id = p.Id,
                Slug = p.Slug,
                Title = p.Title,
                CreatedAt = p.CreatedAt,
                Content = p.Content,
                Excerpt = p.Excerpt,
                Tags = p.Tags,
                Author = p.User.Name,
                ModifiedAt = p.ModifiedAt,
                ModifiedBy = p.ModifiedBy,
                ImageUrl = p.ImageUrl
            })
            .ToList();
        }

        public async Task UpdatePostAsync(int postId, PostRequest request, int userId, string role)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null) throw new NotFoundException("Post not found.");

            if (!AccessHelper.HasAccessToPost(post, userId, role))
                throw new ForbiddenException("You don't have permission to update this post.");

            post.Slug = request.Slug;
            post.Title = request.Title;
            post.Excerpt = request.Excerpt;
            post.Content = request.Content;
            post.Tags = request.Tags;
            post.ModifiedAt = DateTime.UtcNow;
            post.ModifiedBy = role == "admin" ? "admin" : post.User.Name;

            await _context.SaveChangesAsync();
        }

        public async Task DeletePostAsync(int postId, int userId, string role)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
                throw new NotFoundException("Post not found.");

            if (!AccessHelper.HasAccessToPost(post, userId, role))
                throw new ForbiddenException("You don't have permission to delete this post.");

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
        }


    }
}