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

            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";
            if (env == "Development")
            {
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Activities API", Version = "v1" });
                });
            }
            services.AddDbContext<DataContext>(opt =>
            {
                string connectionString;
                if (env == "Development")
                {
                    connectionString = config.GetConnectionString("DefaultConnection");
                }
                else
                {
                    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
                    // Parse connection URL to connection string for Npgsql
                    connUrl = connUrl.Replace("postgres://", string.Empty);
                    var pgUserPass = connUrl.Split("@")[0];
                    var pgHostPortDb = connUrl.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = pgHostPortDb.Split("/")[1];
                    var pgUser = pgUserPass.Split(":")[0];
                    var pgPass = pgUserPass.Split(":")[1];
                    var pgHost = pgHostPort.Split(":")[0];
                    var pgPort = pgHostPort.Split(":")[1];

                    connectionString = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
                }
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
