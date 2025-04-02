using daily_blog_app.Interfaces;
using System.Net.Http;
using System.Threading.Tasks;

namespace daily_blog_app.Services
{
    public class CurrencyService : ICurrencyService
    {
        private readonly HttpClient _httpClient;

        public CurrencyService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string?> GetLatestRatesAsync()
        {
            var url = "https://api.nbp.pl/api/exchangerates/tables/A/?format=json";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return null;

            return await response.Content.ReadAsStringAsync();
        }
    }
}

