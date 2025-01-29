import ToDoCard from "./ToDoCard";
import "./ViewToDos.module.css"

export default function ViewToDos({ToDos }) {
    
    return (
        <>
            <h1>Viewing todos</h1>
            <article> test for different css modules</article>
            <section>
                {ToDos ?
                    ToDos.map(todo => {
                        return <ToDoCard key={todo.id} toDo={todo} />
                    })
                    : ""}
            </section>
            
        </>
    );
}