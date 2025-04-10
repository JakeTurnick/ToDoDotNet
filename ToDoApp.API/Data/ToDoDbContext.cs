using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ToDoApp.API.Models;

namespace ToDoApp.API.Data
{
    public class ToDoDbContext(DbContextOptions<ToDoDbContext> options) : IdentityDbContext<IdentityUser>(options)
    {
        public DbSet<ToDo> ToDos { get; set; }
        public DbSet<DataTest> DataTest { get; set; }
    }
}
