using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;
using ToDoApp.API.Models;
using ToDoApp.API.Services;

namespace ToDoApp.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [Authorize]
    public class AuthedToDoServiceController : ControllerBase
    {

        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public ActionResult<List<ToDo>> GetToDos()
        {
            var ToDos = ToDoService.GetAll();
            if (ToDos == null || ToDos.Count == 0)
            {
                return NotFound();
            }

            return Ok(ToDos);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult<List<ToDo>> AdminGetToDos()
        {
            var ToDos = ToDoService.GetAll();
            if (ToDos == null || ToDos.Count == 0)
            {
                return NotFound();
            }

            return Ok(ToDos);
        }

        // So I can have it accept JsonObjects or I can just work with attributes
        [HttpPost]
        [Authorize(Roles = "Admin, User")]
        public ActionResult<ToDo> GetToDo([FromBody] JsonObject request)
        {
            var result = ToDoService.Get(request["id"].GetValue<int>());
            //var result = ToDoService.Get(id);

            if (result == null) NotFound();

            return result;
        }

        [HttpPost]
        [Authorize(Roles = "Admin, User")]
        public IActionResult CreateToDo(ToDo toDo)
        {
            ToDoService.Add(toDo);
            return CreatedAtAction(nameof(GetToDo), new { id = toDo.Id }, toDo);
        }

        [HttpPut]
        [Authorize(Roles = "Admin, User")]
        public IActionResult UpdateToDo(int id, ToDo toDo)
        {
            if (id != toDo.Id) return BadRequest();

            var existingToDo = ToDoService.Get(id);
            if (existingToDo == null) return NotFound();

            ToDoService.Update(toDo);
            return NoContent();
        }

        [HttpDelete]
        [Authorize(Roles = "Admin, User")]
        public IActionResult DeleteToDo(int id)
        {
            var existingToDo = ToDoService.Get(id);

            if (existingToDo == null) return NotFound();

            ToDoService.Remove(id);

            return NoContent();
        }
    }
}
