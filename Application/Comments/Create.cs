using Application.Comments.Dtos;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Results<CommentDto>>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Results<CommentDto>>
        {
            private readonly IUserAccessor userAccessor;
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext _context, IMapper _mapper, IUserAccessor _userAccessor)
            {
                mapper = _mapper;
                context = _context;
                userAccessor = _userAccessor;
            }

            public async Task<Results<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.ActivityId);

                if (activity == null) return null;

                var user = await context.Users
                    .Include(p => p.Photos.Where(x => x.IsMain == true))
                    .SingleOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body
                };
                // in memory still
                activity.Comments.Add(comment);
                // finally save in DB
                var success = await context.SaveChangesAsync() > 0;
                // convert to DTO mapping
                if (success) return Results<CommentDto>.Success(mapper.Map<CommentDto>(comment));

                return Results<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}
