using System;
using System.Collections.Generic;

namespace daily_blog_app.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Excerpt { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ModifiedAt { get; set; }
        public string? ModifiedBy { get; set; }
        public List<string> Tags { get; set; } = new();
        public string? ImageUrl { get; set; } 


        //Powiązanie z użytkownikiem
        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
