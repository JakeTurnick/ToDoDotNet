using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ToDoApp.API.Data;
using ToDoApp.API.Models;

namespace ToDoApp.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ToDoController : Controller
    {
        private readonly ToDoDbContext _dbContext;

        public ToDoController(ToDoDbContext dbContext) 
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public ActionResult<List<ToDo>> GetToDos()
        {
            var toDos = _dbContext.ToDos.FromSql($"EXECUTE dbo.SelectAllToDos").ToList<ToDo>();
            return toDos;
        }

        [HttpPost]
        public ActionResult<List<ToDo>> PostToDo(ToDo toDo)
        {
            var name = new SqlParameter("@Name", toDo.Name);
            var description = new SqlParameter("@Description", toDo.Description);
            var startDate = new SqlParameter("@StartDate", toDo.StartDate.HasValue ? (object)toDo.StartDate.Value : DBNull.Value);
            var endDate = new SqlParameter("@EndDate", toDo.EndDate.HasValue ? (object)toDo.EndDate.Value : DBNull.Value);
            var isCompleted = new SqlParameter("@IsCompleted", toDo.IsCompleted);
            var result = _dbContext.ToDos.FromSqlRaw($"EXECUTE dbo.InsertToDo " +
                $"@Name, " +
                $"@Description, " +
                $"@IsCompleted, " +
                $"@StartDate, " +
                $"@EndDate ",
                name,
                description,
                isCompleted,
                startDate,
                endDate).ToList<ToDo>();

            return result;
        }
    }
}
