import { useState, useEffect } from 'react';
import ToDoCard from "./ToDoCard";
import { callAPIAsync } from '../../lib/functions.js';
import "./ViewToDos.module.css"

export default function ViewToDos() {
    const [ToDos, setToDos] = useState([]);
    useEffect(() => {
        
        callAPIAsync("ToDoService", "GetToDos", "GET")
            .then(data => {
                if (data.error) {
                    console.error("CallAPI Error: ", data.error)
                } else {
                    //console.log(data)
                    setToDos(data)
                }
            })

            // test code
        /*setToDos([
            {
                name: "first todo",
                description: "first static todo",
                isCompleted: true,
                id: 0
            },
            {
                name: "Model FE todo",
                description: "Get the card and page view right",
                isCompleted: false,
                id: 1
            },
            {
                name: "another  todo",
                description: "Model for more todos, helps work on sizing and page wrap. Also good for overfill so I'm just gonna fill this with lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum ",
                isCompleted: false,
                id: 2
            },
            {
                name: "another  todo",
                description: "Model for more todos, helps work on sizing and page wrap. Also good for overfill so I'm just gonna fill this with lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum lorem lorem lorem ipsum ipsum ipsum ",
                isCompleted: false,
                id: 3
            },
            {
                name: "another  todo",
                description: "Model for more todos, helps work on sizing and page wrap. ",
                isCompleted: false,
                id: 4
            },
            {
                name: "another  todo",
                description: "Model for more todos, helps work on sizing and page wrap. ",
                isCompleted: false,
                id: 5
            },
            {
                name: "another  todo",
                description: "Model for more todos, helps work on sizing and page wrap. ",
                isCompleted: false,
                id: 6
            },
            {
                name: "another  todo",
                description: "Model for more todos, helps work on sizing and page wrap. ",
                isCompleted: false,
                id: 7
            },
            {
                name: "another  todo",
                description: "Model for more todos, helps work on sizing and page wrap. ",
                isCompleted: false,
                id: 8
            },
       ])*/

    }, [])

    
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

// {ToDos ? ToDos.map(todo => <ToDoCard key={todo.Id} toDo={todo} />) : ""}