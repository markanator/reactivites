using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Results<List<Activity>>> { }

        public class Handler : IRequestHandler<Query, Results<List<Activity>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Results<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Results<List<Activity>>.Success(await _context.Activities.ToListAsync());
            }
        }
    }
}
