using daily_blog_app.Data;
using daily_blog_app.Exceptions;
using daily_blog_app.Interfaces;
using daily_blog_app.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace daily_blog_app.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<string> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == request.Username.Trim());

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password.Trim(), user.Password))
                throw new UnauthorizedException("Invalid username or password."); 

            return GenerateJwtToken(user);
        }
        
        public async Task<bool> RegisterAsync(RegisterRequest request)
        {
            if (_context.Users.Any(u => u.Name == request.Username || u.Email == request.Email))
                throw new ConflictException("A user with this username or email already exists."); 

            var user = new User
            {
                Name = request.Username.Trim(),
                Email = request.Email.Trim(),
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password.Trim()),
                Role = "user"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _config.GetSection("JwtSettings");
            var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),

                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

