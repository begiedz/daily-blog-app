using System.Threading.Tasks;

namespace daily_blog_app.Interfaces
{
    public interface ICurrencyService
    {
        Task<string?> GetLatestRatesAsync();
    }
}

