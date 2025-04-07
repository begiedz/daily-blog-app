using daily_blog_app.Interfaces;
using daily_blog_app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
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
        public async Task<IActionResult> GetAllPosts([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var response = await _postService.GetAllPostsAsync(pageNumber, pageSize);
            return Ok(response);
        }


        [HttpGet("{slug}")]
        public async Task<IActionResult> GetPostBySlug([FromRoute] string slug)
        {
            var postDto = await _postService.GetPostBySlugAsync(slug);
            return Ok(postDto);

        }

        [HttpPost("create-post")]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] PostRequest request)
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
                return Ok(new { message = "The post has been created successfully." });        
        }

        [HttpGet("my-posts")]
        [Authorize]
        public async Task<IActionResult> GetMyPosts()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var posts = await _postService.GetPostsByUserAsync(userId);

            return Ok(posts);
        }

        [HttpPut("update-post/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost([FromRoute] int id, [FromBody] PostRequest request)
        {
            if (request == null)
                return BadRequest(new { message = "Invalid post data." });

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var role = User.FindFirstValue(ClaimTypes.Role)!;

            await _postService.UpdatePostAsync(id, request, userId, role);

            return Ok(new { message = "Post updated successfully." });
        }

        [HttpDelete("delete-post/{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePost([FromRoute] int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var role = User.FindFirstValue(ClaimTypes.Role)!;

            await _postService.DeletePostAsync(id, userId, role);
            return Ok(new { message = "Post deleted successfully." });
        }


    }
}
