import { useState, useEffect } from 'react'
import { updateStateField, callAPIAsync } from '@/lib/functions.js'

export default function CreateToDo() {

    // Set page vars
    const todaysDate = new Date()
    const today = todaysDate.toJSON().slice(0, 10);
    const tomorrowsDate = new Date()
    tomorrowsDate.setDate(tomorrowsDate.getDate() + 1)
    const tomorrow = tomorrowsDate.toJSON().slice(0, 10)

    // Create state using page vars
    const [newTodo, setNewTodo] = useState({
        Name: "",
        Description: "",
        startDate: today,
        endDate: tomorrow,
    });
 
    
    // testing funs
    function logCurrentToDo() {
        console.log(newTodo)
    }
    window.logCurrentToDo = logCurrentToDo;

    

    return (
        <>
            <h1>Create a new todo</h1>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                <section style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px"
                }}>
                    <h1>New Todo: </h1>
                    <input type="text" name="Name" placeholder="Exciting task name here!" onInput={(e) => {
                        updateStateField(newTodo, setNewTodo, "Name", e.target.value)
                    }}></input>
                </section>
                <textarea type="textarea" name="Description" placeholder="What is this task about" rows={10} onChange={(e) => { updateStateField(newTodo, setNewTodo, "Description", e.target.value) }}></textarea>
                <input type="date" name="StartDate" value={today} onChange={(e) => { updateStateField(newTodo, setNewTodo, "startDate", e.target.value) }}></input>
                <input type="date" name="StartDate" value={tomorrow} onChange={(e) => { updateStateField(newTodo, setNewTodo, "endtDate", e.target.value) }}></input>

            </form>
            <button onClick={() => { callAPIAsync("ToDoService", "CreateToDo", "POST", newTodo) }}>Submit</button>
        </>
    )
}

/*  ToDo Framework
    
    Title
    Notes
    Date start (default today)
    Target end (default null)
    Completion (default false)


    // later ideas
    Parent/Child tasks
    Repeat (schedule / x unit of time)

*/