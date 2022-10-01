using Application.Activities.Dtos;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Results<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Results<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<Results<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // fetch db activities from Dto fields, results in slim SQL query
                var activities = await _context.Activities.ProjectTo<ActivityDto>(mapper.ConfigurationProvider).ToListAsync();
                // output
                return Results<List<ActivityDto>>.Success(activities);
            }
        }
    }
}
