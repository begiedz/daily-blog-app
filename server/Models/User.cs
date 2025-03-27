namespace daily_blog_app.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } // Username
        public string Email { get; set; }
        public string Password { get; set; } // Hasło (na razie nie haszujemy)
        public string Role { get; set; } // Np. "user", "admin"
    }

}
