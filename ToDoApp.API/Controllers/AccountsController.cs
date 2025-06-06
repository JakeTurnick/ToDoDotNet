﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ToDoApp.API.Services;
using ToDoApp.API.Data;
using ToDoApp.API.Models;
using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;

namespace ToDoApp.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AccountsController : ControllerBase
    {
        private readonly AppIdentityDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IdentityService _identityService;
        private readonly UserService _userService;

        public AccountsController(AppIdentityDbContext context, UserManager<AppUser> userManager,
            RoleManager<IdentityRole<Guid>> roleManager, IdentityService identityService,
            SignInManager<AppUser> signInManager, UserService userService)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _identityService = identityService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterUser registerUser)
        {
            // Create new IdentityUser. This will persist the user to DB
            var identity = new AppUser { Email = registerUser.Email, UserName = registerUser.Email };
            var createdIdentity = await _userManager.CreateAsync(identity, registerUser.Password);

            if (!createdIdentity.Succeeded)
            {
                return BadRequest(createdIdentity.Errors);
            }

            var newClaims = new List<Claim>();

            // Names are optional
            if (registerUser.UserName != null)
            {
                newClaims.Add(new("UserName", registerUser.UserName));
            }
            if (registerUser.FirstName != null && registerUser.LastName != null)
            {
                newClaims.Add(new("FirstName", registerUser.FirstName));
                newClaims.Add(new("LastName", registerUser.LastName));

                await _userManager.AddClaimsAsync(identity, newClaims);
            }
            
            if (registerUser.Role == Role.Admin)
            {
                var role = await _roleManager.FindByNameAsync("Admin");
                if (role == null)
                {
                    role = new IdentityRole<Guid>("Admin");
                    await _roleManager.CreateAsync(role);
                }
                if (!await _userManager.IsInRoleAsync(identity, "Admin"))
                {
                    await _userManager.AddToRoleAsync(identity, "Admin");
                }

                newClaims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }
            else
            {
                var role = await _roleManager.FindByNameAsync("User");
                if (role == null)
                {
                    role = new IdentityRole<Guid>("User");
                    await _roleManager.CreateAsync(role);
                }
                await _userManager.AddToRoleAsync(identity, "User");

                newClaims.Add(new Claim(ClaimTypes.Role, "User"));
            }

            var claimsIdentity = new ClaimsIdentity(new Claim[]
            {
                new(JwtRegisteredClaimNames.Sub, identity.Email ?? throw new InvalidOperationException()),
                new(JwtRegisteredClaimNames.Email, identity.Email ?? throw new InvalidOperationException()),
                new(JwtRegisteredClaimNames.Sid, identity.Id.ToString() ?? throw new InvalidOperationException())
            });

            claimsIdentity.AddClaims(newClaims);

            var token = _identityService.CreateSecurityToken(claimsIdentity);
            var response = new AuthenticationResult(_identityService.WriteToken(token));
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginUser login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user is null) return new ObjectResult("No user found")
            {
                StatusCode = 406
            };

            var result = await _signInManager.CheckPasswordSignInAsync(user, login.Password, false);
            if (!result.Succeeded) return BadRequest("Couldn't sign in");

            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(new { message = "logged in" });

            /* Part of custom JWT Cookie method
             * 
             * var claims = await _userManager.GetClaimsAsync(user);

            var roles = await _userManager.GetRolesAsync(user);

            var claimsIdentity = new ClaimsIdentity(new Claim[]
            {
                new(JwtRegisteredClaimNames.Sub, user.Email ?? throw new InvalidOperationException()),
                new(JwtRegisteredClaimNames.Email, user.Email ?? throw new InvalidOperationException()),
                new(JwtRegisteredClaimNames.Sid, user.Id.ToString() ?? throw new InvalidOperationException())
            });
            claimsIdentity.AddClaims(claims);

            foreach (var role in roles)
            {
                claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            var token = _identityService.CreateSecurityToken(claimsIdentity);

            
            string cookieValue = _identityService.WriteToken(token);
            // var response = new AuthenticationResult(cookieValue);
            // return Ok(response);
            */

            /* Http cookie method
             * writes the cookie that I want, isn't recognized by [Authorize] attribute
             * 
             * Response.Cookies.Append("jwt", cookieValue, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax
            }); */


            // this works but ignores all other claims

        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user is null) return BadRequest("No such user found");

            if (_signInManager.IsSignedIn(User))
            {
                await _signInManager.SignOutAsync();
            }

            return Ok("Logout Successful");
        }

        [HttpGet]
        public IActionResult AuthCheck()
        {
            if (!Guid.TryParse(_userService.GetUserGuidAsync(Request), out Guid guid))
            {
                return BadRequest("No user");
            } else
            {
                return Ok("Still authenticated");
            }
        }

    }
}

public enum Role
{
    Admin,
    User
}
public record RegisterUser(string Email, string Password, string? UserName, string? FirstName, string? LastName, Role Role);
public record LoginUser(string Email, string Password);
public record AuthenticationResult(string Token);