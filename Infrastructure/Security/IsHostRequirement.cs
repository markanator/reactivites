using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;

        public IsHostRequirementHandler(DataContext dbContext,
            IHttpContextAccessor httpContextAccessor)
        {
            this.dbContext = dbContext;
            this.httpContextAccessor = httpContextAccessor;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // does not meet auth requirement
            if (userId == null) return Task.CompletedTask;
            // get activityId from req and convert it
            var activityId = Guid.Parse(httpContextAccessor
                                            .HttpContext?.Request.RouteValues
                                            .SingleOrDefault(x => x.Key == "id")
                                            .Value?.ToString()!
                                        );

            var attendee = dbContext.Attendees
                .AsNoTracking() //dispose of memloc, prevents bug
                .SingleOrDefaultAsync(x => x.UserId == userId && x.ActivityId == activityId).Result;
            if (attendee == null) return Task.CompletedTask;
            // user is authorized
            if (attendee.IsHost) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
