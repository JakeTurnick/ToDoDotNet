using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ToDoApp.API.Models
{
    public class ToDo
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string UserGuid { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? Description { get; set; }
        [Required]
        public bool IsCompleted { get; set; } = false;
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
    }
}
