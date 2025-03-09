using daily_blog_app.Models;
using Microsoft.EntityFrameworkCore;

namespace daily_blog_app.Data
{
    public class ApplicationDbContext : DbContext {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { } 
        public DbSet<User> Users { get; set; } }
}
