using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Results<Unit>>
        {
            public Activity ActivityToEdit { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(c => c.ActivityToEdit).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Results<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapperService;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapperService = mapper;
            }

            public async Task<Results<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityToEdit.Id);
                if (activity == null) return null;

                _mapperService.Map(request.ActivityToEdit, activity);
                var res = await _context.SaveChangesAsync() > 0;

                if (!res) return Results<Unit>.Failure("Failed to update activity");
                return Results<Unit>.Success(Unit.Value);
            }
        }
    }
}
