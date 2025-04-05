using daily_blog_app.Interfaces;
using daily_blog_app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace daily_blog_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // Lista użytkowników-Admin
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        // Usuwanie użytkownika-Admin
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "Użytkownik nie istnieje" });

            var deleted = await _userService.DeleteAsync(id);
            if (!deleted)
                return StatusCode(500, new { message = "Błąd podczas usuwania" });


            return Ok(new { message = $"Użytkownik {user.Name} został usunięty" });
        }


        // Zmiana roli użytkownika-admin
        [HttpPut("{id}/role")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] string newRole)
        {
            if (string.IsNullOrWhiteSpace(newRole))
            {
                return BadRequest(new { message = "Nowa rola jest wymagana." });
            }

            var success = await _userService.UpdateRoleAsync(id, newRole);
            if (!success)
                return NotFound(new { message = "Użytkownik nie istnieje" });

            return Ok(new { message = "Rola zaktualizowana" });

        }

        // Pobieraie danych zalogowanego użytkownika
        [HttpGet("get-my-profile")]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            try
            {
                var userId = GetUserIdFromClaims();
                var user = await _userService.GetByIdAsync(userId);
                if (user == null) return NotFound(new { message = "Użytkownik nie istnieje" });
                return Ok(user);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Wystąpił błąd serwera podczas aktualizacji." });
            }     
        }

        // Aktualizacja hasła/emaila zalogowanego użytkownika
        [HttpPut("update-my-account")]
        [Authorize]
        public async Task<IActionResult> UpdateMe([FromBody] UpdateUserRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) && string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Musisz podać nowe hasło lub email." });
            }

            var userId = GetUserIdFromClaims();

            try
            {
                var success = await _userService.UpdateOwnDataAsync(userId, request.Email, request.Password);
                if (!success) return NotFound(new { message = "Użytkownik nie istnieje" });

                return Ok(new { message = "Dane zaktualizowane" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Wystąpił błąd serwera podczas aktualizacji." });
            } 
        }

        // Pobieranie ID z tokena
        private int GetUserIdFromClaims()
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            return idClaim != null ? int.Parse(idClaim.Value) : throw new Exception("Brak ID w tokenie");
        }
    }

 
   
}
