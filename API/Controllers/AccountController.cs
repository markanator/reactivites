using System.Security.Claims;
using System.Text;
using API.DTOs;
using API.Services;
using Domain;
using Infrastructure.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<AppUser> userManager;
		private readonly SignInManager<AppUser> signInManager;
		private readonly TokenService tokenService;
		private readonly IConfiguration config;
		private readonly IEmailSender emailSender;
		private readonly HttpClient httpClient;

		public AccountController(UserManager<AppUser> userManager,
				SignInManager<AppUser> signInManager,
				TokenService tokenService,
				IConfiguration _config,
				IEmailSender _emailSender)
		{
			this.userManager = userManager;
			this.signInManager = signInManager;
			this.tokenService = tokenService;
			config = _config;
			emailSender = _emailSender;
			httpClient = new HttpClient
			{
				BaseAddress = new System.Uri("https://graph.facebook.com")
			};
		}

		[AllowAnonymous]
		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
		{
			var user = await userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == loginDto.Email);
			// see if user was found
			if (user == null) return Unauthorized("Invalid email");

			if (!user.EmailConfirmed) return Unauthorized("Email not confirmed");

			var res = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
			if (res.Succeeded)
			{
				await SetRefreshToken(user);
				return CreateUserObject(user);
			}
			// sketchy login attempt
			return Unauthorized("Invalid Password");
		}

		[AllowAnonymous]
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

			if (!res.Succeeded) return BadRequest("Problem registering user!");

			// create email
			var origin = Request.Headers["origin"];
			// will be added to db
			var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
			// need to encode it
			token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
			// create template string to send
			var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
			var message = $"<p>Please click the link below to verify your email address.</p><br /><br /><p><a href='{verifyUrl}'>Click to verify email</a></p>";

			await emailSender.SendEmailAsync(user.Email, "Please verify email", message);

			return Ok("Registration successful, please verify email.");
		}

		[AllowAnonymous]
		[HttpPost("verifyEmail")]
		public async Task<IActionResult> VerifyEmail(string token, string email)
		{
			var user = await userManager.FindByEmailAsync(email);
			if (user == null) return BadRequest("User not found");
			var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
			var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
			var res = await userManager.ConfirmEmailAsync(user, decodedToken);
			if (!res.Succeeded) return BadRequest("Could not verify email address");
			return Ok("Email confirmed - you can now login!");
		}

		[AllowAnonymous]
		[HttpGet("resendEmailConfirmationLink")]
		public async Task<IActionResult> ResendEmailConfirmationLink(string email)
		{
			var user = await userManager.FindByEmailAsync(email);
			if (user == null) return BadRequest();
			if (user.EmailConfirmed) return BadRequest("Email already confirmed.");

			// create email
			var origin = Request.Headers["origin"];
			// will be added to db
			var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
			// need to encode it
			token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
			// create template string to send
			var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
			var message = $"<p>Please click the link below to verify your email address.</p><br /><br /><p><a href='{verifyUrl}'>Click to verify email</a></p>";

			await emailSender.SendEmailAsync(user.Email, "Please verify email", message);

			return Ok("Email verification link was sent.");
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

			await SetRefreshToken(user);
			return CreateUserObject(user);
		}

		[AllowAnonymous]
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

			user.EmailConfirmed = true; // already verified by FB
			var createNewUserResult = await userManager.CreateAsync(user);
			if (!createNewUserResult.Succeeded) return BadRequest("Problem creating user account");

			await SetRefreshToken(user);
			return CreateUserObject(user);
		}

		[Authorize]
		[HttpPost("refresh")]
		public async Task<ActionResult<UserDto>> RefreshToken()
		{
			var refreshToken = Request.Cookies["refreshToken"];

			var user = await userManager.Users
				.Include(p => p.Photos)
				.Include(r => r.RefreshTokens)
				.FirstOrDefaultAsync(u => u.UserName == User.FindFirstValue(ClaimTypes.Name));
			if (user == null) return Unauthorized();

			var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);
			if (oldToken != null && !oldToken.IsActive) return Unauthorized();

			// create new JWT for user
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

		private async Task SetRefreshToken(AppUser user)
		{
			var refreshToken = tokenService.GenerateRefreshToken();
			user.RefreshTokens.Add(refreshToken);
			await userManager.UpdateAsync(user);
			// send back as cookie
			var cookieOptions = new CookieOptions
			{
				HttpOnly = true, // not accessible via JS
				Expires = DateTime.UtcNow.AddDays(7),
			};
			Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
		}
	}
}
