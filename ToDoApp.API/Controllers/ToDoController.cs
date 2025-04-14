using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlTypes;
using System.Security.Claims;
using ToDoApp.API.Data;
using ToDoApp.API.Models;
using ToDoApp.API.Services;

namespace ToDoApp.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]/[action]")]
    public class ToDoController : Controller
    {
        private readonly ToDoDbContext _dbContext;
        private readonly UserService _userService;
        private readonly UserManager<AppUser> _userManager;

        public ToDoController(ToDoDbContext dbContext, UserManager<AppUser> userManager, UserService userService) 
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles="Admin")]
        public IActionResult GetToDos()
        {
            var toDos = _dbContext.ToDos.FromSql($"EXECUTE dbo.SelectAllToDos").ToList();
            if (toDos == null || !toDos.Any())
            {
                return NotFound("No ToDos found.");
            }
            return Ok(toDos);
        }

        [HttpGet]
        public IActionResult GetUserToDos()
        {
            if (!Guid.TryParse(_userService.GetUserGuidAsync(Request), out Guid guid))
            {
                return BadRequest("No user");
            }

            var userGuid = new SqlParameter("@UserGuid", guid);

            var toDos = _dbContext.ToDos.FromSqlRaw($"EXECUTE dbo.SelectAllToDosByUser " +
                $"@UserGuid",
                userGuid).ToList<ToDo>();
            return Ok(toDos);
        }

        [HttpGet("{guid}")]
        public IActionResult GetToDoByGuid(Guid guid)
        {
            if (guid == Guid.Empty)
            {
                return BadRequest("No Id found on request");
            }

            var toDoGuid = new SqlParameter("@Guid", guid);
            var result = _dbContext.ToDos.FromSqlRaw($"EXECUTE dbo.SelectToDoById " +
                $"@Guid",
                toDoGuid);

            return Ok(result);
        }

        [HttpPost]
        public IActionResult PostToDo(unsavedToDo toDo)
        {
            if (!Guid.TryParse(_userService.GetUserGuidAsync(Request), out Guid userGuid))
            {
                return BadRequest("No user");
            }

            var createdByUserGuid = new SqlParameter("@CreatedByUserGuid", userGuid);

            if (toDo.Name?.Length < 1)
            {
                return BadRequest("ToDo name must be a valid string");
            }
            var name = new SqlParameter("@Name", toDo.Name);
            var description = new SqlParameter("@Description", toDo.Description);
            var startDate = new SqlParameter("@StartDate", toDo.StartDate.HasValue ? (object)toDo.StartDate.Value : DBNull.Value);
            var endDate = new SqlParameter("@EndDate", toDo.EndDate.HasValue ? (object)toDo.EndDate.Value : DBNull.Value);
            var isCompleted = new SqlParameter("@IsCompleted", toDo.IsCompleted);
            var result = _dbContext.ToDos.FromSqlRaw($"EXECUTE dbo.InsertToDo " +
                $"@CreatedByUserGuid, " +
                $"@Name, " +
                $"@Description, " +
                $"@IsCompleted, " +
                $"@StartDate, " +
                $"@EndDate ",
                createdByUserGuid,
                name,
                description,
                isCompleted,
                startDate,
                endDate).ToList<ToDo>();

            return Ok(result);
        }

        [HttpPatch]
        public IActionResult UpdateToDo(ToDo toDo)
        {
            if (toDo.Guid == Guid.Empty)
            {
                return BadRequest("No Guid found to locate ToDo");
            }

            var guid = new SqlParameter("@Guid", toDo.Guid);
            var name = new SqlParameter("@Name", toDo.Name);
            var description = new SqlParameter("@Description", toDo.Description ?? (object)DBNull.Value);
            var startDate = new SqlParameter("@StartDate", toDo.StartDate.HasValue ? (object)toDo.StartDate.Value : DBNull.Value);
            var endDate = new SqlParameter("@EndDate", toDo.EndDate.HasValue ? (object)toDo.EndDate.Value : DBNull.Value);
            var isCompleted = new SqlParameter("@IsCompleted", toDo.IsCompleted);
            var result = _dbContext.ToDos.FromSqlRaw($"EXECUTE dbo.UpdateToDo " +
                $"@Guid, " +
                $"@Name, " +
                $"@Description, " +
                $"@IsCompleted, " +
                $"@StartDate, " +
                $"@EndDate ",
                guid,
                name,
                description,
                isCompleted,
                startDate,
                endDate).ToList<ToDo>();

            return Ok(result);
        }

        [HttpDelete("{guid}")]
        public IActionResult DeleteToDoByGuid(Guid guid)
        {
            if (guid == Guid.Empty)
            {
                return BadRequest("No Id found on request");
            }

            var toDoGuid = new SqlParameter("@Guid", guid);
            var resultParam = new SqlParameter
            {
                ParameterName = "@Result",
                SqlDbType = System.Data.SqlDbType.Int,
                Direction = System.Data.ParameterDirection.Output
            };

            _dbContext.Database.ExecuteSqlRaw("EXEC dbo.DeleteToDoByGuid @Guid, @Result OUTPUT", toDoGuid, resultParam);

            int result = (int)resultParam.Value;

            if (result == 0)
            {
                return Ok("ToDo deleted successfully.");
            }
            else
            {
                return NotFound("ToDo not found.");
            }
        }
    }
}
