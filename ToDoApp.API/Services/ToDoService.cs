using ToDoApp.API.Models;

namespace ToDoApp.API.Services
{
    public static class ToDoService
    {
        static List<ToDo> ToDos { get; set; }
        static int nextId = 3;
        static ToDoService()
        {

            ToDos = new List<ToDo>
            {
                new() {
                    Id = 0,
                    Name = "Test API with service",
                    Description = "Use a service before setting up DB to actually test API functionality and move forward",
                    IsCompleted = true,
                },
                new ToDo {
                    Id = 1,
                    Name = "Build out FE features with service",
                    Description = "continue making progress on overall app, worry about DB later",
                    IsCompleted = false,
                },
                new ToDo {
                    Id = 2,
                    Name = "Connect DB and re-attempt APIs with DB connection",
                    Description = "Now that things are working, and you understand a little better - try again",
                },
            };
        }

        public static List<ToDo> GetAll() { return ToDos; }
        public static ToDo? Get(int id)
        {
            return ToDos.FirstOrDefault(x => x.Id == id);
        }

        public static void Add(ToDo toDo)
        {
            toDo.Id = nextId++;
            ToDos.Add(toDo);
        }

        public static void Remove(int id)
        {
            var todo = Get(id);
            if (todo is null) return;

            ToDos.Remove(todo);
        }

        public static void Update(ToDo toDo)
        {
            var index = ToDos.IndexOf(toDo);
            if (index == -1) return;

            ToDos[index] = toDo;
        }
        
    }
}
