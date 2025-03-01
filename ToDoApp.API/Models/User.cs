using System.ComponentModel.DataAnnotations;

namespace ToDoApp.API.Models
{
    public class User
    {
        [Required]
        public string Name { get; set; }
    }
}
