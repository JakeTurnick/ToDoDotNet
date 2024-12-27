import { useState, useEffect } from 'react';
import ToDoCard from "./ToDoCard";
import { callAPIAsync } from '../../lib/functions.js';

export default function ViewToDos() {
    const [ToDos, setToDos] = useState([]);
    useEffect(() => {
        const data = callAPIAsync("ToDoService", "GetToDos", "GET")
        console.log(data)
        setToDos(data)
    }, [])

    setTimeout(() => { console.log(ToDos) }, 200)

    // TODO (haha) : Find out why callAPI returns promise, and how to just get the fulfilled response
    
    return (
        <>
            <h1>Viewing todos</h1>
            
        </>
    );
}

// {ToDos ? ToDos.map(todo => <ToDoCard key={todo.Id} toDo={todo} />) : ""}