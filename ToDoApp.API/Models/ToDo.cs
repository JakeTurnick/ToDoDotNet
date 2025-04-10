using System.ComponentModel.DataAnnotations;

namespace ToDoApp.API.Models
{
    public class ToDo
    {
        [Required]
        [Key]
        public Guid? Guid { get; set; }
        public Guid? CreatedByUserGuid { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? Description { get; set; }
        [Required]
        public bool IsCompleted { get; set; } = false;
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
    }
}
