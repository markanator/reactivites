using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application.Activities;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace API
{
	public class Startup
	{
		private readonly IConfiguration _config;

		public Startup(IConfiguration config)
		{
			_config = config;
		}


		// This method gets called by the runtime. Use this method to add services to the container.
		[Obsolete]
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers(opts =>
			{
				var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
				// all routes require auth token
				opts.Filters.Add(new AuthorizeFilter(policy));
			})
					.AddFluentValidation(config =>
					{
						config.RegisterValidatorsFromAssemblyContaining<Create>();
					});
			// add custom services within this file
			services.AddApplicationServices(_config);
			services.AddIdentityServices(_config);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.UseMiddleware<ExceptionMiddleware>();
			// add security measures
			app.UseXContentTypeOptions();
			app.UseReferrerPolicy(opt => opt.NoReferrer());
			app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
			app.UseXfo(opt => opt.Deny());
			app.UseCsp(opt => opt
				.BlockAllMixedContent()
				.StyleSources(s => s.Self().CustomSources(
					"sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
					"sha256-wGsX+U/5/7lWRr7MvYQoXrHmajGTY+1KUob4gEPPnH0=",
					"sha256-GNF74DLkXb0fH3ILHgILFjk1ozCF3SNXQ5mQb7WLu/Y=",
					"sha256-DpOoqibK/BsYhobWHnU38Pyzt5SjDZuR/mFsAiVN7kk=",
					"sha256-wkAU1AW/h8YFx0XlzvpTllAKnFEO2tw8aKErs5a26LY=",
					"sha256-Y/huXlwoYkVyQlxwSVcCi1RCDGDCSVBzDt0hYP9qlTc="
					))
				.FontSources(s => s.Self())
				.FormActions(s => s.Self())
				.FrameAncestors(s => s.Self())
				.ImageSources(s => s.Self().CustomSources(
					"data:",
					"https://res.cloudinary.com",
					"https://www.facebook.com",
					"https://platform-lookaside.fbsbx.com"
					))
				.ScriptSources(s => s.Self().CustomSources(
						"sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
						"https://connect.facebook.net",
						"sha256-wGsX+U/5/7lWRr7MvYQoXrHmajGTY+1KUob4gEPPnH0=",
						"sha256-Tui7QoFlnLXkJCSl1/JvEZdIXTmBttnWNxzJpXomQjg=",
						"sha256-vpD4kayiUYOTFvnTWYCDknM5I3Nd2XUzIKx9+q6BNu0="
						))
			);

			if (env.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
			}
			else
			{
				app.Use(async (context, next) =>
				{
					context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
					await next.Invoke();
				});
			}

			// app.UseHttpsRedirection();

			app.UseRouting();

			// will look into ./wwwroot/ for index.html
			app.UseDefaultFiles();
			// will server static files from ./wwwroot/
			app.UseStaticFiles();

			app.UseCors("CorsPolicy");

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
				endpoints.MapHub<ChatHub>("/comments");
				endpoints.MapFallbackToController("Index", "Fallback");
			});
		}
	}
}
