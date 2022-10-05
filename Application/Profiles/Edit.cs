using Application.Core;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Results<Unit>>
        {
            public string DisplayName { get; set; }
            public string Bio { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Results<Unit>>
        {
            private readonly DataContext dataContext;
            private readonly IUserAccessor userAccessor;
            private readonly ILogger<Edit> logger;

            public Handler(DataContext _dataContext, IUserAccessor userAccessor, ILogger<Edit> logger)
            {
                dataContext = _dataContext;
                this.userAccessor = userAccessor;
                this.logger = logger;
            }

            public async Task<Results<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // get the user
                var user = await dataContext.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

                if (user == null) return null;
                // update bio if it exists
                user.Bio = request.Bio ?? user.Bio;
                // same for display name
                user.DisplayName = request.DisplayName ?? user.DisplayName;
                // give 200 even if nothing changed
                dataContext.Entry(user).State = EntityState.Modified;

                // check if saved with new values
                var success = await dataContext.SaveChangesAsync() > 0;

                if (success) return Results<Unit>.Success(Unit.Value);

                return Results<Unit>.Failure("Problem updating profile");
            }
        }
    }
}
