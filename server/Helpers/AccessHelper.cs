using daily_blog_app.Models;

namespace daily_blog_app.Helpers
{
    public class AccessHelper
    {
        public static bool HasAccessToPost(Post post, int userId, string role)
        {
            // Użytkownik ma dostęp, jeśli jest właścicielem posta lub ma rolę admin
            return post.UserId == userId || role.ToLower() == "admin";
        }
    }
}
