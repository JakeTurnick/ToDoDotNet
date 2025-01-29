import { useState, useEffect } from 'react'
import styles from "./ToDoCard.module.css"

export default function ToDoCard({ toDo }) {
    const [todo, setTodo] = useState({});
    useEffect(() => {
        if (toDo == null) {
            console.error("to do is null")
            return
        } else {
            setTodo(toDo)
            //console.log(toDo, toDo.name)
        }
    }, [])
    
    return (
        <article className={styles.ToDoCard}>
          <h3>{todo.name ? toDo.name : "No name available"}</h3>
            <p>{todo.description}</p>
          <input type="checkbox" value={todo.isCompleted} readOnly={true } />
          <p>{todo.startDate}</p>
            <p>{todo.endDate}</p>
      </article>
  );
}

