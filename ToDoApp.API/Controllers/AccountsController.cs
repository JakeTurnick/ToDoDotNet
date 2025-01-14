using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ToDoApp.API.Services;
using ToDoApp.API.Data;

namespace ToDoApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly AppIdentityDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IdentityService _identityService;

        public AccountsController(AppIdentityDbContext context, UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager, IdentityService identityService,
            SignInManager<IdentityUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _identityService = identityService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUser registerUser)
        {
            // Create new IdentityUser. This will persist the user to DB
            var identity = new IdentityUser { Email = registerUser.Email, UserName = registerUser.Email };
            var createdIdentity = await _userManager.CreateAsync(identity, registerUser.Password);

            var newClaims = new List<Claim>
            {
                new("FirstName", registerUser.FirstName),
                new("LastName", registerUser.LastName)
            };

            await _userManager.AddClaimsAsync(identity, newClaims);

            if (registerUser.Role == Role.Admin)
            {
                var role = await _roleManager.FindByNameAsync("Admin");
                if (role == null)
                {
                    role = new IdentityRole("Admin");
                    await _roleManager.CreateAsync(role);
                }
                await _userManager.AddToRoleAsync(identity, "Admin");

                newClaims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }

            else
            {
                var role = await _roleManager.FindByNameAsync("User");
                if (role == null)
                {
                    role = new IdentityRole("User");
                    await _roleManager.CreateAsync(role);
                }
                await _userManager.AddToRoleAsync(identity, "User");

                newClaims.Add(new Claim(ClaimTypes.Role, "User"));
            }

            var claimsIdentity = new ClaimsIdentity(new Claim[]
            {
                new(JwtRegisteredClaimNames.Sub, identity.Email ?? throw new InvalidOperationException()),
                new(JwtRegisteredClaimNames.Email, identity.Email ?? throw new InvalidOperationException())
            });

            claimsIdentity.AddClaims(newClaims);

            var token = _identityService.CreateSecurityToken(claimsIdentity);
            var response = new AuthenticationResult(_identityService.WriteToken(token));
            return Ok(response);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUser login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user is null) return BadRequest("No such user found");

            var result = await _signInManager.CheckPasswordSignInAsync(user, login.Password, false);
            if (!result.Succeeded) return BadRequest("Couldn't sign in");

            var claims = await _userManager.GetClaimsAsync(user);

            var roles = await _userManager.GetRolesAsync(user);

            var claimsIdentity = new ClaimsIdentity(new Claim[]
            {
                new(JwtRegisteredClaimNames.Sub, user.Email ?? throw new InvalidOperationException()),
                new(JwtRegisteredClaimNames.Email, user.Email ?? throw new InvalidOperationException())
            });

            claimsIdentity.AddClaims(claims);

            foreach (var role in roles)
            {
                claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            var token = _identityService.CreateSecurityToken(claimsIdentity);

            var response = new AuthenticationResult(_identityService.WriteToken(token));
            return Ok(response);
        }

    }
}

public enum Role
{
    Admin,
    User
}
public record RegisterUser(string Email, string Password, string FirstName, string LastName, Role Role);
public record LoginUser(string Email, string Password);
public record AuthenticationResult(string Token);