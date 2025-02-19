﻿using Microsoft.AspNetCore.Http.HttpResults;
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
        public IActionResult GetToDos()
        {
            var toDos = _dbContext.ToDos.FromSql($"EXECUTE dbo.SelectAllToDos").ToList<ToDo>();
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

            return Ok(result);
        }

        [HttpPatch]
        public IActionResult UpdateToDo(ToDo toDo)
        {
            if (toDo?.Id <= 0 || toDo?.Id == null)
            {
                return BadRequest("No toDo Id found on request");
            }
            var id = new SqlParameter("@Id", toDo.Id);
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
                id,
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

            var id = new SqlParameter("@Id", Id);
            var result = _dbContext.ToDos.FromSqlRaw($"EXECUTE dbo.DeleteToDoById " +
                $"@Id",
                id);


            // Works 100% of the time - need to have SQL send something back
            // Check results of sql
            return Ok(result);
        }
    }
}
