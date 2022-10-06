using Application.Comments.Dtos;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Results<List<CommentDto>>>
        {
            public Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Results<List<CommentDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext _context, IMapper _mapper)
            {
                mapper = _mapper;
                context = _context;
            }

            public async Task<Results<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await context.Comments
                    .Where(x => x.Activity.Id == request.ActivityId)
                    .OrderByDescending(x => x.CreatedAt)
                    .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

                return Results<List<CommentDto>>.Success(comments);
            }
        }
    }
}
