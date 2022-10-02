using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
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

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }
            public async Task<Results<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                                            .Include(z => z.Attendees)
                                                .ThenInclude(at => at.User)
                                            .FirstOrDefaultAsync(x => x.Id == request.Id);
                if (activity == null)
                {
                    return null;
                }
                var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userAccessor.GetUsername());
                if (user == null) return null;
                var hostUsername = activity.Attendees.FirstOrDefault(atU => atU.IsHost)?.User?.UserName;
                var currUserAttendance = activity.Attendees.FirstOrDefault(x => x.User.UserName == user.UserName);
                // user is HOST
                if (currUserAttendance != null && hostUsername == user.UserName)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }
                // user already joined and want to be removed
                if (currUserAttendance != null && hostUsername != user.UserName)
                {
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

                    activity.Attendees.Add(currUserAttendance);
                }
                // save to db
                var res = await context.SaveChangesAsync() > 0;
                return res ? Results<Unit>.Success(Unit.Value) : Results<Unit>.Failure("Problem updating attendance.");
            }
        }
    }
}
