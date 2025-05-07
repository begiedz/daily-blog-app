using NUnit.Framework;
using FluentAssertions;
using daily_blog_app.Services;
using daily_blog_app.Data;
using daily_blog_app.Models;
using daily_blog_app.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DailyBlogApp.Tests
{
    [TestFixture]
    public class BlogServiceTests
    {
        private ApplicationDbContext _context;
        private BlogService _blogService;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase($"BlogDb_{Guid.NewGuid()}")
                .Options;

            _context = new ApplicationDbContext(options);

            var user = new User { Id = 1, Name = "Author", Email = "author@test.com", Role = "user" , Password = BCrypt.Net.BCrypt.HashPassword("password123") };
            _context.Users.Add(user);

            _context.Posts.AddRange(new List<Post>
            {
                new Post { Id = 1, Title = "First Post", Content = "Content", User = user, UserId = 1, CreatedAt = DateTime.UtcNow, Slug = "first-post-1" },
                new Post { Id = 2, Title = "Second Post", Content = "Content", User = user, UserId = 1, CreatedAt = DateTime.UtcNow, Slug = "second-post-2" }
            });

            _context.SaveChanges();
            _blogService = new BlogService(_context);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }

        [Test]
        public async Task GetAllPostsAsync_ReturnsPaginatedList()
        {
            var result = await _blogService.GetAllPostsAsync(1, 10);

            result.Should().NotBeNull();
            result.Posts.Should().HaveCount(2);
            result.Pagination.TotalItems.Should().Be(2);
        }

        [Test]
        public async Task GetPostBySlugAsync_ReturnsCorrectPost()
        {
            var post = await _blogService.GetPostBySlugAsync("first-post-1");

            post.Should().NotBeNull();
            post.Title.Should().Be("First Post");
        }

        [Test]
        public void GetPostBySlugAsync_InvalidSlug_ThrowsNotFoundException()
        {
            Assert.ThrowsAsync<NotFoundException>(() => _blogService.GetPostBySlugAsync("unknown-slug"));
        }

        [Test]
        public async Task CreatePostAsync_CreatesPostWithSlug()
        {
            var post = new Post
            {
                Title = "New Post",
                Content = "Test Content",
                Tags = new List<string> { "test" },
                Excerpt = "short"
            };

            await _blogService.CreatePostAsync(post, 1);

            post.Slug.Should().StartWith("new-post-");
            var created = await _context.Posts.FirstOrDefaultAsync(p => p.Title == "New Post");
            created.Should().NotBeNull();
        }

        [Test]
        public async Task GetPostsByUserAsync_ReturnsUserPosts()
        {
            var posts = await _blogService.GetPostsByUserAsync(1);

            posts.Should().HaveCount(2);
            posts[0].Author.Should().Be("Author");
        }

        [Test]
        public async Task UpdatePostAsync_WithAccess_UpdatesPost()
        {
            var request = new PostRequest
            {
                Title = "Updated Title",
                Content = "Updated",
                Tags = new List<string> { "update" },
                Excerpt = "short"
            };

            await _blogService.UpdatePostAsync(1, request, 1, "user");

            var updated = await _context.Posts.FindAsync(1);
            updated.Title.Should().Be("Updated Title");
            updated.Slug.Should().StartWith("updated-title-");
        }

        [Test]
        public void UpdatePostAsync_NoAccess_ThrowsForbiddenException()
        {
            var request = new PostRequest
            {
                Title = "Hack",
                Content = "Hack",
                Tags = new List<string> { "example" },
                Excerpt = "hack"
            };

            Assert.ThrowsAsync<ForbiddenException>(() =>
                _blogService.UpdatePostAsync(1, request, 99, "user"));
        }

        [Test]
        public async Task DeletePostAsync_WithAccess_DeletesPost()
        {
            await _blogService.DeletePostAsync(1, 1, "user");

            var post = await _context.Posts.FindAsync(1);
            post.Should().BeNull();
        }

        [Test]
        public void DeletePostAsync_NoAccess_ThrowsForbiddenException()
        {
            Assert.ThrowsAsync<ForbiddenException>(() =>
                _blogService.DeletePostAsync(1, 99, "user"));
        }
    }
}
