using daily_blog_app.Models;

namespace daily_blog_app.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllAsync();
        Task<UserDto?> GetByIdAsync(int id);
        Task<bool> DeleteAsync(int id);
        Task<bool> UpdateRoleAsync(int id, string newRole);         
        Task<bool> UpdateOwnDataAsync(int id, string newEmail, string newPassword); 

    }
}
