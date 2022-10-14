using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Activities API", Version = "v1" });
            });

            services.AddDbContext<DataContext>(opt =>
            {
                var connectionString = config.GetConnectionString("DefaultConnection");
                opt.UseNpgsql(connectionString, opt =>
                {
                    // enable splitting of queries to improve perf, & prevent redundant data fetching
                    opt.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
                });
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                            {
                                policy
                                    .AllowAnyMethod()
                                    .AllowAnyHeader()
                                    .AllowCredentials()
                                    .WithExposedHeaders("Pagination")
                                    .WithOrigins(config["FE_CONNECTION_URL"]);
                            });
            });
            // to allow for CQRS + mediator pattern
            services.AddMediatR(typeof(List.Handler).Assembly);
            // allows for use of autoMapper throughout the project
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            // add ability to get user from httpContext from any authenticated reqs
            services.AddScoped<IUserAccessor, UserAccessor>();
            // Dep Inj
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            // add cloud photo config
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            // adds signalR support
            services.AddSignalR();

            return services;
        }
    }
}
