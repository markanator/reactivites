using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Results<Unit>>
        {
            public string TargetUsername { get; set; }
        }

        public class Handler : IRequestHandler<Command, Results<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly ILogger<FollowToggle> logger;

            public Handler(DataContext _context, IUserAccessor _userAccessor, ILogger<FollowToggle> _logger)
            {
                userAccessor = _userAccessor;
                logger = _logger;
                context = _context;
            }

            public async Task<Results<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // get both users
                // First, who is making the call
                var observer = await context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == userAccessor.GetUsername());
                logger.LogInformation("🎉🎉🎉 USER FOUND");
                // who do we want to follow
                var target = await context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == request.TargetUsername);

                if (target == null)
                {
                    logger.LogInformation("🚩🚩🚩 TARGET NOT FOUND");
                    return null;
                }
                // Check if this already exists
                var following = await context.UserFollowings.FindAsync(observer.Id, target.Id);
                // not found? lets add it
                if (following == null)
                {
                    following = new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    };

                    context.UserFollowings.Add(following);
                }
                else
                {
                    // looks like it was found, remove it!
                    context.UserFollowings.Remove(following);
                }
                // check for any changes made
                var success = await context.SaveChangesAsync() > 0;
                // hazzaa!
                if (success) return Results<Unit>.Success(Unit.Value);

                return Results<Unit>.Failure("Failed to update following");
            }
        }

    }
}
