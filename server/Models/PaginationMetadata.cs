namespace daily_blog_app.Models
{
    public class PaginationMetadata
    {
        public int TotalItems { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }

        public PaginationMetadata(int totalItemCount, int pageSize, int currentPage)
        {
            TotalItems = totalItemCount;
            PageSize = pageSize;
            CurrentPage = currentPage;
            TotalPages = (int)Math.Ceiling(totalItemCount / (double)pageSize);
        }
    }
}


