using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity ActivityToEdit { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapperService;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapperService = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityToEdit.Id);

                _mapperService.Map(request.ActivityToEdit, activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
