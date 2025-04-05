using daily_blog_app.Interfaces;
using daily_blog_app.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;


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

            try
            {
                var token = await _authService.LoginAsync(request);
                return Ok(new { token, message = "Zalogowano pomyślnie" });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Wystąpił błąd serwera podczas logowania." });
            }
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

            // Walidacja emaila
            if (!Regex.IsMatch(request.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                return BadRequest(new { message = "Nieprawidłowy format adresu e-mail." });
            }

            try
            {
                var success = await _authService.RegisterAsync(request);
                if (!success)
                    return BadRequest(new { message = "Użytkownik o podanym loginie lub mailu już istnieje." });

                return Ok(new { message = "Użytkownik zarejestrowany" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Wystąpił błąd serwera podczas rejestracji." });
            }
        }


    }
}
