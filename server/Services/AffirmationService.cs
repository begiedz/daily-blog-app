using daily_blog_app.Exceptions;
using daily_blog_app.Interfaces;
using System.Text.Json;

public class AffirmationService : IAffirmationService
{
    private readonly HttpClient _httpClient;

    public AffirmationService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetRandomAffirmationAsync()
    {
        var url = "https://www.affirmations.dev";
        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();

        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        var affirmation = root.GetProperty("affirmation").GetString();

        if (string.IsNullOrWhiteSpace(affirmation))
            throw new NotFoundException("No affirmation available at the moment.");

        return affirmation!;
    }
}
