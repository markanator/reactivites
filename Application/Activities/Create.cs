using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Results<Unit>>
        {
            public Activity NewActivity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(c => c.NewActivity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Results<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Results<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.NewActivity);
                var res = await _context.SaveChangesAsync() > 0;
                if (!res) return Results<Unit>.Failure("Failed to create activity");
                // command don't return anything, this is for our controller
                return Results<Unit>.Success(Unit.Value);
            }
        }
    }
}
