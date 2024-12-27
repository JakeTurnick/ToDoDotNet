using Microsoft.AspNetCore.Mvc;

namespace ToDoApp.API.Controllers
{
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Greet()
        {
            string response = "hello :)";
            return Ok(response);
        }
    }
}
