using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Results<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Results<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly ILogger<UpdateAttendance> logger;

            public Handler(DataContext context, IUserAccessor userAccessor, ILogger<UpdateAttendance> logger)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.logger = logger;
            }
            public async Task<Results<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                                            .Include(z => z.Attendees)
                                                .ThenInclude(at => at.User)
                                            .SingleOrDefaultAsync(x => x.Id == request.Id);
                if (activity == null)
                {
                    logger.LogWarning("🚩🚩🚩 NO ACTIVITY FOUND");
                    return null;
                }
                var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUsername());
                if (user == null)
                {
                    logger.LogWarning("🚩🚩🚩 NO USER FOUND");
                    return null;
                }
                var hostUsername = activity.Attendees.FirstOrDefault(atU => atU.IsHost)?.User?.UserName;
                var currUserAttendance = activity.Attendees.FirstOrDefault(x => x.User.UserName == user.UserName);
                // user is HOST
                if (currUserAttendance != null && hostUsername == user.UserName)
                {
                    logger.LogInformation("🚩🚩🚩 CANCELLING EVENT");
                    activity.IsCancelled = !activity.IsCancelled;
                }
                // user already joined and want to be removed
                if (currUserAttendance != null && hostUsername != user.UserName)
                {
                    logger.LogInformation("🚩🚩🚩 USER IS LEAVING THE EVENT");
                    activity.Attendees.Remove(currUserAttendance);
                }
                // user is not owner and not an attendee, add them
                if (currUserAttendance == null)
                {
                    currUserAttendance = new ActivityAttendee
                    {
                        User = user,
                        Activity = activity,
                        IsHost = false
                    };

                    logger.LogInformation("🚩🚩🚩 USER IS ATTENDING THE EVENT");
                    activity.Attendees.Add(currUserAttendance);
                }
                // save to db
                var hasSaved = await context.SaveChangesAsync() > 0;
                return hasSaved ? Results<Unit>.Success(Unit.Value) : Results<Unit>.Failure("Problem updating attendance.");
            }
        }
    }
}
