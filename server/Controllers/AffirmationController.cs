using daily_blog_app.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AffirmationController : ControllerBase
{
    private readonly IAffirmationService _affirmationService;

    public AffirmationController(IAffirmationService affirmationService)
    {
        _affirmationService = affirmationService;
    }

    [HttpGet("random")]
    public async Task<IActionResult> GetRandomAffirmation()
    {
        var affirmation = await _affirmationService.GetRandomAffirmationAsync();
        return Ok(new { affirmation });
    }
}
