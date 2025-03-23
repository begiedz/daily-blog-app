using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace daily_blog_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public CurrencyController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("kursy-walut")]
        public async Task<IActionResult> GetLatestRates()
        {
            var url = "https://api.nbp.pl/api/exchangerates/tables/A/?format=json";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Błąd pobierania danych z NBP");

            var content = await response.Content.ReadAsStringAsync();

            return Content(content, "application/json");
        }
    }
}
