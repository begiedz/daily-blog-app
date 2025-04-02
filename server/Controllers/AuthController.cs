using daily_blog_app.Interfaces;
using daily_blog_app.Models;
using Microsoft.AspNetCore.Mvc;

namespace daily_blog_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Login i hasło są wymagane." });
            }

            var token = await _authService.LoginAsync(request);

            if (token == null)
                return Unauthorized(new { message = "Nieprawidłowa nazwa użytkownika lub hasło" });

            return Ok(new { token, message = "Zalogowano pomyślnie" });
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Wszystkie pola są wymagane." });
            }

            var success = await _authService.RegisterAsync(request);
            if (!success)
                return BadRequest(new { message = "Użytkownik o podanym loginie lub mailu już istnieje." });

            return Ok(new { message = "Użytkownik zarejestrowany" });
        }

    }
}
