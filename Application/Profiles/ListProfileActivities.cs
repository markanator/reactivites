using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListProfileActivities
    {
        public class Query : IRequest<Results<List<UserActivityDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Results<List<UserActivityDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext _context, IMapper _mapper)
            {
                mapper = _mapper;
                context = _context;
            }

            public async Task<Results<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Attendees
                    .Where(u => u.User.UserName == request.Username)
                    .OrderBy(a => a.Activity.Date)
                    // create simpler queries
                    .ProjectTo<UserActivityDto>(mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.Now),
                    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    _ => query.Where(a => a.Date >= DateTime.Now)
                };

                var activities = await query.ToListAsync();

                return Results<List<UserActivityDto>>.Success(activities);
            }
        }
    }
}
