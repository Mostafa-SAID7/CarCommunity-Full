using CarCommunity.Application.DTOs.Car;
using FluentValidation;

namespace CarCommunity.Application.Validators
{
    public class CreateCarDtoValidator : AbstractValidator<CreateCarDto>
    {
        public CreateCarDtoValidator()
        {
            RuleFor(x => x.Make)
                .NotEmpty().WithMessage("Make is required")
                .MaximumLength(50).WithMessage("Make must not exceed 50 characters");

            RuleFor(x => x.Model)
                .NotEmpty().WithMessage("Model is required")
                .MaximumLength(50).WithMessage("Model must not exceed 50 characters");

            RuleFor(x => x.Year)
                .InclusiveBetween(1900, DateTime.Now.Year + 1)
                .WithMessage($"Year must be between 1900 and {DateTime.Now.Year + 1}");

            RuleFor(x => x.Description)
                .MaximumLength(1000).WithMessage("Description must not exceed 1000 characters");

            RuleFor(x => x.ImageUrl)
                .Must(BeAValidUrl).WithMessage("Image URL must be a valid URL")
                .When(x => !string.IsNullOrEmpty(x.ImageUrl));

            RuleFor(x => x.UserId)
                .NotEmpty().WithMessage("User ID is required");
        }

        private bool BeAValidUrl(string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out _);
        }
    }
}