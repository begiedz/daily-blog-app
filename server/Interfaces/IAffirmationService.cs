using System.Threading.Tasks;

namespace daily_blog_app.Interfaces
{
    public interface IAffirmationService
    {
        Task<string> GetRandomAffirmationAsync();
    }

}

