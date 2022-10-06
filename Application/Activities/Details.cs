using Application.Activities.Dtos;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Results<ActivityDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Results<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor _userAccessor)
            {
                _context = context;
                this.mapper = mapper;
                userAccessor = _userAccessor;
            }

            public async Task<Results<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // fetch single activity, only want Dto info => slim SQL query
                var activity = await _context.Activities
                    .ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                        new { currentUsername = userAccessor.GetUsername() })
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Results<ActivityDto>.Success(activity);
            }
        }
    }
}
