using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ToDoApp.API.Services;
using ToDoApp.API.Models;

namespace ToDoApp.API.Services
{
    public class UserService
    {
        private readonly UserManager<AppUser> _userManager;

        public UserService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Guid> GetUserGuidAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            return user?.Id ?? Guid.Empty; // Assuming UserGuid is the Id property
        }
    }
}
