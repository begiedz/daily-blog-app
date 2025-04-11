using Microsoft.AspNetCore.Http;

namespace daily_blog_app.Interfaces
{
    public interface IBlobService
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task DeleteFileAsync(string fileName);
    }
}
