using Application.Core;
using Application.Interfaces;
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
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor _userAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                userAccessor = _userAccessor;
            }
            public async Task<Results<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {

                var userProfile = await context.Users
                                        .ProjectTo<Profile>(mapper.ConfigurationProvider,
                        new { currentUsername = userAccessor.GetUsername() })
                                        .SingleOrDefaultAsync(x => x.Username == request.Username);
                if (userProfile == null) return null;

                return Results<Profile>.Success(userProfile);
            }
        }
    }
}
