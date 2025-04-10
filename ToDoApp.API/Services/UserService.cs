using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ToDoApp.API.Services;
using ToDoApp.API.Models;
using Azure.Core;

namespace ToDoApp.API.Services
{
    public class UserService
    {
        private readonly UserManager<AppUser> _userManager;

        public UserService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public string GetUserGuidAsync(HttpRequest request)
        {
            // Access the default identity cookie
            if (request.Cookies.TryGetValue(".AspNetCore.Identity.Application", out string cookieValue))
            {
                var user = request.HttpContext.User;
                string userSid = user.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

                return userSid;
            }
            else
            {
                return null;
            }
        }
    }
}
