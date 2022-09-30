using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Results<Activity>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Results<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Results<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity =  await _context.Activities.FindAsync(request.Id);
                return Results<Activity>.Success(activity);
            }
        }
    }
}
