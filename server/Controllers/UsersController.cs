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

        // === ADMIN: LISTA UŻYTKOWNIKÓW ===
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        // === ADMIN: USUŃ UŻYTKOWNIKA ===
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


        // === ADMIN: ZMIEŃ ROLĘ UŻYTKOWNIKA ===
        [HttpPut("{id}/role")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] string newRole)
        {
            var success = await _userService.UpdateRoleAsync(id, newRole);
            if (!success)
                return NotFound(new { message = "Użytkownik nie istnieje" });

            return Ok(new { message = "Rola zaktualizowana" });

        }

        // === USER: POBIERZ SWOJE DANE ===
        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            var userId = GetUserIdFromClaims();
            var user = await _userService.GetByIdAsync(userId);
            if (user == null) return NotFound(new { message = "Użytkownik nie istnieje" });
            return Ok(user);
        }

        // === USER: AKTUALIZUJ SWÓJ EMAIL I HASŁO ===
        [HttpPut("me")]
        [Authorize]
        public async Task<IActionResult> UpdateMe([FromBody] UpdateUserRequest request)
        {
            var userId = GetUserIdFromClaims();
            var success = await _userService.UpdateOwnDataAsync(userId, request.Email, request.Password);
            if (!success) return NotFound(new { message = "Użytkownik nie istnieje" });

            return Ok(new { message = "Dane zaktualizowane" });
            
        }

        // === Pomocnicza metoda do pobrania ID z tokena ===
        private int GetUserIdFromClaims()
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            return idClaim != null ? int.Parse(idClaim.Value) : throw new Exception("Brak ID w tokenie");
        }
    }

 
   
}
