using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System.Collections.Generic;
using TodoApp.Server.Data;
using TodoApp.Server.Data.Models;


namespace TodoApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {
        public IConfiguration config { get; set; }

        [HttpGet]
        public async Task<IActionResult> GetToDos()
        {
            using AppDbContext DB = new(config);
            var result = DB.ToDos.FromSql($"EXECUTE dbo.SelectAllToDos");

            return Ok(await result.ToListAsync());

        }

        [HttpGet]
        public ActionResult<String> TestObj()
        {
            string test = "hello";

            return Ok(test);
        }


    }
}
