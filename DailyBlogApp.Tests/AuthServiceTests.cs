using daily_blog_app.Data;
using daily_blog_app.Exceptions;
using daily_blog_app.Models;
using daily_blog_app.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace DailyBlogApp.Tests
{
    public class AuthServiceTests
    {
        private AuthService _authService;
        private ApplicationDbContext _context;
        private IConfiguration _config;

        [SetUp]
        public void Setup()
        {
            // In-memory baza danych
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: $"AuthServiceTestDb_{Guid.NewGuid()}")
                .Options;

            _context = new ApplicationDbContext(options);

            _context.Users.Add(new User
            {
                Id = 1,
                Name = "testuser",
                Email = "test@example.com",
                Password = BCrypt.Net.BCrypt.HashPassword("password123"),
                Role = "user"
            });

            _context.SaveChanges();

            var inMemorySettings = new Dictionary<string, string>
            {
                { "JwtSettings:Key", "this_is_a_test_key_123456789012345" },
                { "JwtSettings:Issuer", "testIssuer" },
                { "JwtSettings:Audience", "testAudience" }
            };

            _config = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            _authService = new AuthService(_context, _config);
        }

        [Test]
        public async Task LoginAsync_WithValidCredentials_ReturnsToken()
        {
            var request = new LoginRequest
            {
                Username = "testuser",
                Password = "password123"
            };

            var token = await _authService.LoginAsync(request);

            token.Should().NotBeNullOrWhiteSpace();
        }

        [Test]
        public void LoginAsync_WithInvalidPassword_ThrowsUnauthorizedException()
        {
            var request = new LoginRequest
            {
                Username = "testuser",
                Password = "wrongpassword"
            };

            Assert.ThrowsAsync<UnauthorizedException>(() => _authService.LoginAsync(request));
        }

        [Test]
        public void LoginAsync_WithNonexistentUser_ThrowsUnauthorizedException()
        {
            var request = new LoginRequest
            {
                Username = "nosuchuser",
                Password = "whatever"
            };

            Assert.ThrowsAsync<UnauthorizedException>(() => _authService.LoginAsync(request));
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}