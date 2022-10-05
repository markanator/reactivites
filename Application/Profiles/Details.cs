using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Results<Profile>>
        {
            public string Username { get; set; }
        }
        public class Handler : IRequestHandler<Query, Results<Profile>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Results<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {

                var userProfile = await context.Users
                                        .ProjectTo<Profile>(mapper.ConfigurationProvider)
                                        .SingleOrDefaultAsync(x => x.Username == request.Username);
                if (userProfile == null) return null;

                return Results<Profile>.Success(userProfile);
            }
        }
    }
}
