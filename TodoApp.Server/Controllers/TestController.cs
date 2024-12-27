using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;
using TodoApp.Server.Data.Models;
namespace TodoApp.Server.Controllers
{
    [Controller]
    public class TestController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public int AddOne(int num)
        {
            return num + 1;
        }

        [HttpGet]
        public IActionResult ReturnOne()
        {
            var dict = new Dictionary<string, string>
            {
                { "name", "Foobar" },
                { "url", "admin@foobar.com" }
            };

            var json = new JsonResult(dict);
            string name = "test Todo";
            string description = "description";


            ToDo Todo = new ToDo();
            return Json(dict);
        }
    }
}
