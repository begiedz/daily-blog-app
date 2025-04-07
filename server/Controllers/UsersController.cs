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

        // Lista użytkowników-- tylko dla admina
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        // Usuwanie użytkownika-- tylko dla admina
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await _userService.DeleteAsync(id);
            return Ok(new { message = "User deleted successfully." });
        }


        // Zmiana roli użytkownika - tylko dla admina
        [HttpPut("{id}/role")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateRole([FromRoute] int id, [FromBody] string newRole)
        {
            if (string.IsNullOrWhiteSpace(newRole))
            {
                return BadRequest(new { message = "Role is required." });
            }

            await _userService.UpdateRoleAsync(id, newRole); 
            return Ok(new { message = "Role updated successfully." });
        }

        // Pobieraie danych zalogowanego użytkownika
        [HttpGet("get-my-profile")]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            var userId = GetUserIdFromClaims();
            var user = await _userService.GetByIdAsync(userId); 
            return Ok(user);
        }

        // Aktualizacja hasła/emaila zalogowanego użytkownika
        [HttpPut("update-my-account")]
        [Authorize]
        public async Task<IActionResult> UpdateMe([FromBody] UpdateUserRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) && string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "You must provide a new password or email." });
            }

            var userId = GetUserIdFromClaims();
            await _userService.UpdateOwnDataAsync(userId, request.Email, request.Password);
            return Ok(new { message = "Account updated successfully." });
        }

        // Pobieranie ID z tokena
        private int GetUserIdFromClaims()
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            return idClaim != null ? int.Parse(idClaim.Value) : throw new Exception("User ID missing from token");
        }
    }

 
   
}
