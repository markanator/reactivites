using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Results<Unit>>
        {
            public Activity NewActivity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(c => c.NewActivity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Results<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Results<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // get logged in user user
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                // create attendee
                var attendee = new ActivityAttendee
                {
                    User = user,
                    Activity = request.NewActivity,
                    IsHost = true,
                };
                // add attendee to incoming activity
                request.NewActivity.Attendees.Add(attendee);

                // save incoming activity with relations to mem + table
                _context.Activities.Add(request.NewActivity);
                var res = await _context.SaveChangesAsync() > 0;
                if (!res) return Results<Unit>.Failure("Failed to create activity");
                // command don't return anything, this is for our controller
                return Results<Unit>.Success(Unit.Value);
            }
        }
    }
}
