using daily_blog_app.Interfaces;
using daily_blog_app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Security.Claims;
using static System.Net.Mime.MediaTypeNames;

namespace daily_blog_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _postService;
        private readonly IBlobService _blobService;

        public BlogController(IBlogService postService,IBlobService blobService)
        {
            _postService = postService;
            _blobService = blobService;
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
        public async Task<IActionResult> CreatePost([FromForm] PostRequest request)
        {

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            string? imageUrl = null;

            if (request.Image != null)
            {
               
                imageUrl = await _blobService.UploadFileAsync(request.Image);
            }


            var post = new Post
                {
                    
                    Title = request.Title,
                    Excerpt = request.Excerpt,
                    Content = request.Content,
                    Tags = request.Tags,
                    CreatedAt = DateTime.UtcNow,
                    UserId = userId,
                    ImageUrl = imageUrl
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
            var userName = HttpContext.User.Identity.Name;
            await _postService.UpdatePostAsync(id, request, userId, role, userName);

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
