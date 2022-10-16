using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Controllers
{
	[AllowAnonymous]// anyone can use these endpoints
	[ApiController]
	[Route("api/[controller]")]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<AppUser> userManager;
		private readonly SignInManager<AppUser> signInManager;
		private readonly TokenService tokenService;
		private readonly IConfiguration config;
		private readonly HttpClient httpClient;

		public AccountController(UserManager<AppUser> userManager,
				SignInManager<AppUser> signInManager,
				TokenService tokenService,
				IConfiguration _config)
		{
			this.userManager = userManager;
			this.signInManager = signInManager;
			this.tokenService = tokenService;
			config = _config;
			httpClient = new HttpClient
			{
				BaseAddress = new System.Uri("https://graph.facebook.com")
			};
		}
		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
		{
			var user = await userManager.Users
																	.Include(p => p.Photos)
																	.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
			// see if user was found
			if (user == null) return Unauthorized("Invalid email");

			var res = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
			if (res.Succeeded)
			{
				return CreateUserObject(user);
			}
			// sketchy login attempt
			return Unauthorized("Invalid Password");
		}

		[HttpPost("register")]
		public async Task<ActionResult<UserDto>> Register(RegisterDto regDto)
		{
			if (await userManager.Users.AnyAsync(x => x.Email == regDto.Email))
			{
				ModelState.AddModelError("email", "Email is already taken.");
				return ValidationProblem();
			}
			if (await userManager.Users.AnyAsync(x => x.UserName == regDto.UserName))
			{
				ModelState.AddModelError("username", "Username is already taken.");
				return ValidationProblem();
			}
			var user = new AppUser
			{
				DisplayName = regDto.DisplayName,
				Email = regDto.Email,
				UserName = regDto.UserName
			};
			var res = await userManager.CreateAsync(user, regDto.Password);
			if (res.Succeeded)
			{
				return CreateUserObject(user);
			}

			return BadRequest("Problem registering user");
		}

		[Authorize]
		[HttpGet]
		public async Task<ActionResult<UserDto>> GetCurrentUser()
		{
			var user = await userManager.Users
																	.Include(p => p.Photos)
																	.FirstOrDefaultAsync(x =>
																			x.Email == User.FindFirstValue(ClaimTypes.Email)
																	);

			if (user == null) return Unauthorized();

			//await SetRefreshToken(user);
			return CreateUserObject(user);
		}

		[HttpPost("fbLogin")]
		public async Task<ActionResult<UserDto>> FacebookLogin(string accessToken)
		{
			var fbVerifyKeys = config["Facebook:AppId"] + "|" + config["Facebook:AppSecret"];
			var verifyToken = await httpClient.GetAsync($"debug_token?input_token={accessToken}&access_token={fbVerifyKeys}");
			if (!verifyToken.IsSuccessStatusCode) return Unauthorized();
			var fbUrl = $"me?access_token={accessToken}&fields=name,email,picture.with(500).height(500)";
			var res = await httpClient.GetAsync(fbUrl);
			if (!res.IsSuccessStatusCode) return Unauthorized();

			var fbInfo = JsonConvert.DeserializeObject<dynamic>(await res.Content.ReadAsStringAsync());

			var username = (string)fbInfo.id;
			var user = await userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.UserName == username);

			if (user != null) return CreateUserObject(user);
			// else, need to create new user
			user = new AppUser
			{
				DisplayName = (string)fbInfo.name,
				Email = (string)fbInfo.email,
				UserName = (string)fbInfo.id,
				Photos = new List<Photo> {
					new Photo{
						Id = "fb_" + (string)fbInfo.id,
						Url = (string)fbInfo.picture.data.url,
						IsMain = true,
					},
				},
			};

			var createNewUserResult = await userManager.CreateAsync(user);
			if (!createNewUserResult.Succeeded) return BadRequest("Problem creating user account");

			return CreateUserObject(user);
		}

		private UserDto CreateUserObject(AppUser user)
		{
			return new UserDto
			{
				DisplayName = user.DisplayName,
				Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
				Token = tokenService.CreateToken(user),
				Username = user.UserName
			};
		}
	}
}
