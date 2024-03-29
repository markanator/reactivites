﻿using Application.Activities.Dtos;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Results<PagedList<ActivityDto>>>
        {
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Results<PagedList<ActivityDto>>>
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

            public async Task<Results<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // fetch db activities from Dto fields, results in slim SQL query
                var query = _context.Activities
                    .Where(x => x.Date >= request.Params.StartTime)
                    .OrderBy(d => d.Date)
                    .ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                        new { currentUsername = userAccessor.GetUsername() })
                    .AsQueryable();
                // currently logged in user
                if (request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(x => x.Attendees.Any(a => a.Username == userAccessor.GetUsername()));
                }

                // when user is hosting
                if (request.Params.IsHost && !request.Params.IsGoing)
                {
                    query = query.Where(x => x.HostUsername == userAccessor.GetUsername());
                }

                // output
                return Results<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}
