using System.Text.Json.Serialization;

namespace daily_blog_app.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public string Email { get; set; }
        public string Password { get; set; } 
        public string Role { get; set; }

        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }

}
