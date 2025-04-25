using FluentValidation;
using daily_blog_app.Models;
using System.Linq;
using daily_blog_app.Interfaces;

namespace daily_blog_app.Validators
{
    public class PostRequestValidator : AbstractValidator<PostRequest>
    { 
        public PostRequestValidator()
        {
            

            RuleFor(x => x.Title)
                    .NotEmpty().WithMessage("Title is required.")
                    .MinimumLength(3).WithMessage("Title must be at least 3 characters long.")
                    .MaximumLength(25).WithMessage("Title must be at most 25 characters long.")
                    .Must(HaveAtLeastThreeLettersOrDigits)
                    .WithMessage("Title must contain at least 3 letters or digits.");

           
            RuleFor(x => x.Content)
                    .NotEmpty().WithMessage("Content is required.")
                    .MinimumLength(3).WithMessage("Content must be at least 3 characters long.")
                    .MaximumLength(5000).WithMessage("Content must be at most 5000 characters long.");

            RuleFor(x => x.Excerpt)
                .NotEmpty().WithMessage("Excerpt is required.")
                .MinimumLength(3).WithMessage("Excerpt must be at least 3 characters long.")
                .MaximumLength(100).WithMessage("Excerpt must be at most 100 characters long.");

            RuleFor(x => x.Tags)
                .NotNull().WithMessage("Tags are required.")
                .Must(tags => tags.Count <= 15).WithMessage("You can add up to 15 tags only.");

            RuleFor(x => x.Image)
                .Cascade(CascadeMode.Stop)
                .Must(BeAValidSize).WithMessage("Image size cannot exceed 2 MB.")
                .Must(HaveAllowedExtension).WithMessage("Only JPG, JPEG, PNG and GIF files are allowed.")
                .When(p => p.Image != null);
        }

        private bool HaveAtLeastThreeLettersOrDigits(string title)
        {
            return title.Count(char.IsLetterOrDigit) >= 3;
        }

        private bool BeAValidSize(IFormFile file)
        {
            return file.Length <= 2 * 1024 * 1024;
        }

        private bool HaveAllowedExtension(IFormFile file)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            return allowedExtensions.Contains(extension);
        }
        

    }

}

