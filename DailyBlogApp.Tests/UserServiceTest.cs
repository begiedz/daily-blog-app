using NUnit.Framework;
using FluentAssertions;
using daily_blog_app.Data;
using daily_blog_app.Models;
using daily_blog_app.Services;
using daily_blog_app.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DailyBlogApp.Tests
{
    [TestFixture]
    public class UserServiceTests
    {
        private ApplicationDbContext _context;
        private UserService _userService;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: $"TestDb_{System.Guid.NewGuid()}")
                .Options;

            _context = new ApplicationDbContext(options);

            _context.Users.AddRange(new List<User>
            {
                new User { Id = 1, Name = "Alicja", Email = "alicja@example.com", Role = "user", Password = "pw1" },
                new User { Id = 2, Name = "Bogus", Email = "bogus@example.com", Role = "admin", Password = "pw2" }
            });
            _context.SaveChanges();

            _userService = new UserService(_context);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }

        [Test]
        public async Task GetAllAsync_ReturnsAllUsers()
        {
            var result = await _userService.GetAllAsync();
            result.Should().HaveCount(2);
        }

        [Test]
        public async Task GetByIdAsync_ExistingId_ReturnsUser()
        {
            var user = await _userService.GetByIdAsync(1);
            user.Should().NotBeNull();
            user.Name.Should().Be("Alicja");
        }

        [Test]
        public void GetByIdAsync_NonexistentId_ThrowsNotFoundException()
        {
            Assert.ThrowsAsync<NotFoundException>(() => _userService.GetByIdAsync(99));
        }

        [Test]
        public async Task DeleteAsync_ExistingUser_RemovesUser()
        {
            var result = await _userService.DeleteAsync(1);
            result.Should().BeTrue();

            var remainingUsers = await _userService.GetAllAsync();
            remainingUsers.Should().HaveCount(1);
        }

        [Test]
        public void DeleteAsync_NonexistentUser_ThrowsNotFoundException()
        {
            Assert.ThrowsAsync<NotFoundException>(() => _userService.DeleteAsync(99));
        }

        [Test]
        public async Task UpdateRoleAsync_ValidData_UpdatesRole()
        {
            var result = await _userService.UpdateRoleAsync(1, "moderator");
            result.Should().BeTrue();

            var user = await _userService.GetByIdAsync(1);
            user.Role.Should().Be("moderator");
        }

        [Test]
        public void UpdateRoleAsync_InvalidRole_ThrowsArgumentException()
        {
            Assert.ThrowsAsync<ArgumentException>(() => _userService.UpdateRoleAsync(1, ""));
        }

        [Test]
        public void UpdateRoleAsync_NonexistentUser_ThrowsNotFoundException()
        {
            Assert.ThrowsAsync<NotFoundException>(() => _userService.UpdateRoleAsync(999, "admin"));
        }

        [Test]
        public async Task UpdateOwnDataAsync_UpdatesEmailAndPassword()
        {
            var result = await _userService.UpdateOwnDataAsync(1, "new@example.com", "newpassword123");
            result.Should().BeTrue();

            var user = await _context.Users.FindAsync(1);
            user.Email.Should().Be("new@example.com");
            BCrypt.Net.BCrypt.Verify("newpassword123", user.Password).Should().BeTrue();
        }

        [Test]
        public void UpdateOwnDataAsync_NonexistentUser_ThrowsNotFoundException()
        {
            Assert.ThrowsAsync<NotFoundException>(() => _userService.UpdateOwnDataAsync(999, "x", "y"));
        }
    }
}
