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
        public IActionResult TestGetGUID()
        {
            // Access the default identity cookie
            if (Request.Cookies.TryGetValue(".AspNetCore.Identity.Application", out string cookieValue))
            {
                string userSid = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

                return Ok(userSid);
            }
            else
            {
                return BadRequest("Cookie not found");
            }
        }

        [HttpGet]
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
            var userGuid = new SqlParameter("@UserGuid", _userService.GetUserGuidAsync(Request));
            if (userGuid == null) return BadRequest("No user");

            var toDos = _dbContext.ToDos.FromSqlRaw($"EXECUTE dbo.SelectAllToDosByUser " +
                $"@UserGuid",
                userGuid).ToList<ToDo>();
            return Ok(toDos);
        }

        [HttpGet("{Id}")]
        public IActionResult GetToDoById(int Id)
        {
            if (Id <= 0)
            {
                return BadRequest("No Id found on request");
            }

            var id = new SqlParameter("@Id", Id);
            var result = _dbContext.ToDos.FromSqlRaw($"EXECUTE dbo.SelectToDoById " +
                $"@Id",
                id);

            return Ok(result);
        }

        [HttpPost]
        public IActionResult PostToDo(ToDo toDo)
        {
            // _userService.GetUserGuidAsync(Request)
            Guid.TryParse("F8659D03-DA2E-4835-F7C9-08DD6D4A9F45", out Guid userGuid);
            SqlGuid newGuid;

            if (userGuid == Guid.Empty)
            {
                return BadRequest("No user");
            } else
            {
                newGuid = new SqlGuid("F8659D03-DA2E-4835-F7C9-08DD6D4A9F45");
            }

            var guid = new SqlParameter("@Guid", Guid.NewGuid());
            var createdByUserGuid = new SqlParameter("@CreatedByUserGuid", new Guid("F8659D03-DA2E-4835-F7C9-08DD6D4A9F45"));

            if (toDo.Name?.Length < 1)
            {
                return BadRequest("ToDo name must be present and longer than 1 character");
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
                return BadRequest("No toDo Id found on request");
            }
            var guid = new SqlParameter("@Id", toDo.Guid);
            var name = new SqlParameter("@Name", toDo.Name);
            var description = new SqlParameter("@Description", toDo.Description);
            var startDate = new SqlParameter("@StartDate", toDo.StartDate.HasValue ? (object)toDo.StartDate.Value : DBNull.Value);
            var endDate = new SqlParameter("@EndDate", toDo.EndDate.HasValue ? (object)toDo.EndDate.Value : DBNull.Value);
            var isCompleted = new SqlParameter("@IsCompleted", toDo.IsCompleted);
            var result = _dbContext.ToDos.FromSqlRaw($"EXECUTE dbo.UpdateToDo " +
                $"@Id, " +
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

        [HttpDelete("{Id}")]
        public IActionResult DeleteToDoById(int Id)
        {
            if (Id <= 0)
            {
                return BadRequest("No Id found on request");
            }

            var idParam = new SqlParameter("@Id", Id);
            var resultParam = new SqlParameter
            {
                ParameterName = "@Result",
                SqlDbType = System.Data.SqlDbType.Int,
                Direction = System.Data.ParameterDirection.Output
            };

            _dbContext.Database.ExecuteSqlRaw("EXEC dbo.DeleteToDoById @Id, @Result OUTPUT", idParam, resultParam);

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
