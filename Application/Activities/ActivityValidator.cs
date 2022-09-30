using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotNull().NotEmpty();
            RuleFor(x => x.Description).NotNull().NotEmpty();
            RuleFor(x => x.Date).NotNull().NotEmpty();
            RuleFor(x => x.Category).NotNull().NotEmpty();
            RuleFor(x => x.City).NotNull().NotEmpty();
            RuleFor(x => x.Venue).NotNull().NotEmpty();
        }
    }
}
