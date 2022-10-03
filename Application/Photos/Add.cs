using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Results<Photo>>
        {
            // this prop name is important
            public IFormFile File { get; set; }
        }
        class Handler : IRequestHandler<Command, Results<Photo>>
        {
            private readonly DataContext context;
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context,
                IPhotoAccessor photoAccessor,
                IUserAccessor userAccessor)
            {
                this.context = context;
                this.photoAccessor = photoAccessor;
                this.userAccessor = userAccessor;
            }

            public async Task<Results<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

                if (user == null) return null;
                // addPhoto throws error for us
                var photoUploadResult = await photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };
                // set isMain if no other photo is set
                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;
                // add to user's collection
                user.Photos.Add(photo);
                // save to db
                var result = await context.SaveChangesAsync() > 0;

                if (result) return Results<Photo>.Success(photo);

                return Results<Photo>.Failure("Problem adding photo");
            }
        }
    }
}
