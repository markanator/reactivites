using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://127.0.0.1:5173");
                });
            });
            // to allow for CQRS + mediator pattern 
            services.AddMediatR(typeof(List.Handler).Assembly);

            // Cleaner code when mapping to DB
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            // add ability to get user from anywhere
            services.AddScoped<IUserAccessor, UserAccessor>();

            return services;
        }
    }
}
