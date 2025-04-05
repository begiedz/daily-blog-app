using daily_blog_app.Interfaces;
using daily_blog_app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace daily_blog_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _postService;

        public BlogController(IBlogService postService)
        {
            _postService = postService;
        }

        [HttpGet("all-posts")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postService.GetAllPostsAsync();
            var result = posts.Select(p => new
            {
                p.Slug,
                p.Title,
                p.CreatedAt,
                p.Excerpt,
                p.Tags
            });
            return Ok(result);
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetPostBySlug(string slug)
        {
            var post = await _postService.GetPostBySlugAsync(slug);
            if (post == null) return NotFound(new { message = "Post nie istnieje" });

            return Ok(new
            {
                post.Slug,
                post.Title,
                post.CreatedAt,
                post.Content,
                post.Tags,
                Author = post.User.Name
            });
        }

        [HttpPost("create-post")]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] PostRequest request)
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

                var post = new Post
                {
                    Slug = request.Slug,
                    Title = request.Title,
                    Excerpt = request.Excerpt,
                    Content = request.Content,
                    Tags = request.Tags,
                    CreatedAt = DateTime.UtcNow,
                    UserId = userId
                };

                await _postService.CreatePostAsync(post, userId);

                return Ok(new { message = "Post został dodany poprawnie." });
            }
            catch (Exception ex)
            {
     
                return StatusCode(500, new { message = "Wystąpił błąd podczas zapisywania posta. Spróbuj ponownie." });
            }
        }

        [HttpGet("my-posts")]
        [Authorize]
        public async Task<IActionResult> GetMyPosts()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            try
            {
                var posts = await _postService.GetPostsByUserAsync(userId);

                var result = posts.Select(p => new
                {
                    p.Slug,
                    p.Title,
                    p.CreatedAt,
                    p.Excerpt,
                    p.Tags
                });

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Wystąpił błąd podczas pobierania postów użytkownika." });
            }
        }


    }
}
