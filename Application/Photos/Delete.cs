using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Results<Unit>>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Results<Unit>>
        {
            private readonly DataContext dataContext;
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext dataContext, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                this.dataContext = dataContext;
                this.photoAccessor = photoAccessor;
                this.userAccessor = userAccessor;
            }
            public async Task<Results<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await dataContext.Users
                                            .Include(p => p.Photos)
                                            .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

                if (user == null) return null;
                // access in memory
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null) return null;

                if (photo.IsMain) return Results<Unit>.Failure("Unable to delete your main photo.");

                var results = await photoAccessor.DeletePhoto(photo.Id);

                if (results == null) return Results<Unit>.Failure("Problem deleting photo from cloudinary");
                user.Photos.Remove(photo);
                var success = await dataContext.SaveChangesAsync() > 0;
                if (success) return Results<Unit>.Success(Unit.Value);
                return Results<Unit>.Failure("Unable to delete photo from API");
            }
        }
    }
}
