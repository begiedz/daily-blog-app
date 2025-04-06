using daily_blog_app.Data;
using daily_blog_app.Exceptions;
using daily_blog_app.Interfaces;
using daily_blog_app.Models;
using Microsoft.EntityFrameworkCore;

namespace daily_blog_app.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            return await _context.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                    Role = u.Role
                })
                .ToListAsync();
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                    Role = u.Role
                })
                .FirstOrDefaultAsync();

            if (user == null)
                throw new NotFoundException("User not found.");

            return user;
        }


        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) throw new NotFoundException("User not found.");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateRoleAsync(int id, string newRole)
        {
            if (string.IsNullOrWhiteSpace(newRole))
                throw new ArgumentException("New role is required.");

            var user = await _context.Users.FindAsync(id);
            if (user == null) throw new NotFoundException("User not found.");

            user.Role = newRole.Trim().ToLower();
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateOwnDataAsync(int id, string newEmail, string newPassword)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) throw new NotFoundException("User not found.");

            if (!string.IsNullOrWhiteSpace(newEmail))
                user.Email = newEmail.Trim();

            if (!string.IsNullOrWhiteSpace(newPassword))
                user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword.Trim());

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
