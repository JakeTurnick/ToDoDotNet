using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.Data.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Description { get; set; }
        public bool IsComplete { get; set; } = false;
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
    }
}
