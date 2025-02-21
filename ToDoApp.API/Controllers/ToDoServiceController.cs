using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;
using ToDoApp.API.Models;
using ToDoApp.API.Services;

namespace ToDoApp.API.Controllers
{
    [ApiController]
    [Route("ToDoService/[action]")]
    public class ToDoServiceController : ControllerBase
    {

        [HttpGet]
        public ActionResult<List<ToDo>> GetToDos()
        {
            var ToDos = ToDoService.GetAll();
            if (ToDos == null || ToDos.Count == 0)
            {
                return NotFound();
            }

            return Ok(ToDos);
        }

        // So I can have it accept JsonObjects or I can just work with attributes
        [HttpGet("{id}")]
        public ActionResult<ToDo> GetToDo(int id)
        {
            var result = ToDoService.Get(id);
            //var result = ToDoService.Get(id);

            if (result == null) NotFound();

            return result;
        }

        [HttpPost]
        public IActionResult CreateToDo(ToDo toDo)
        {
            ToDoService.Add(toDo);
            return CreatedAtAction(nameof(GetToDo), new { id = toDo.Id }, toDo);
        }

        [HttpPut]
        public IActionResult UpdateToDo(int id, ToDo toDo)
        {
            if (id != toDo.Id) return BadRequest();

            var existingToDo = ToDoService.Get(id);
            if (existingToDo == null) return NotFound();

            ToDoService.Update(toDo);
            return NoContent();
        }

        [HttpDelete]
        public IActionResult DeleteToDo(int id)
        {
            var existingToDo = ToDoService.Get(id);

            if (existingToDo == null) return NotFound();

            ToDoService.Remove(id);

            return NoContent();
        }
    }
}
