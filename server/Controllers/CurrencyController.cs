using daily_blog_app.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace daily_blog_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private readonly ICurrencyService _currencyService;

        public CurrencyController(ICurrencyService currencyService)
        {
            _currencyService = currencyService;
        }

        [HttpGet("kursy-walut")]
        public async Task<IActionResult> GetLatestRates()
        {
            var content = await _currencyService.GetLatestRatesAsync();

            if (string.IsNullOrEmpty(content))
                return StatusCode(502, new { message = "Błąd pobierania danych z NBP" });

            return Content(content, "application/json");
        }
    }
}
