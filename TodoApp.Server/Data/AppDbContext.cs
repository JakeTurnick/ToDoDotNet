using Microsoft.EntityFrameworkCore;
using TodoApp.Server.Data.Models;

namespace TodoApp.Server.Data
{
    public class AppDbContext : DbContext
    {
        public IConfiguration _config { get; set; }
        public AppDbContext(IConfiguration config)
        {
            _config = config;
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("DatabaseConnection"));
            //base.OnConfiguring(optionsBuilder);
        }

        public DbSet<ToDo> ToDos { get; set; }
    }
}
