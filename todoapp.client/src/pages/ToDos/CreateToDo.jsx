import { useState, useEffect } from 'react';
import { updateStateField, callAPIAsync } from '@/lib/functions.js';
import Styles from './CreateToDo.module.css';
import UniStyles from '@/lib/UniStyles.module.css';


export default function CreateToDo(props) {
    // Set page vars
    const todaysDate = new Date();
    const today = todaysDate.toJSON().slice(0, 10);
    const tomorrowsDate = new Date();
    tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
    const tomorrow = tomorrowsDate.toJSON().slice(0, 10);

    if (props.todo?.id !== null && props.todo?.id !== undefined) {
        console.log("editing todo", props.todo?.id)
        // use to change method
    }

    console.log("todo prop", props.todo)
    // Create state using page vars
    const [newTodo, setNewTodo] = useState(props.todo ? props.todo :
        {
            name: "",
            description: "",
            startDate: today,
            endDate: tomorrow,
        }
    );


    function validateTodo() {
        if (newTodo.Name.length > 0) {
            return true
        }

        return false
    }
 
    // testing funs
    function logCurrentToDo() {
        console.log(newTodo)
    }
    window.logCurrentToDo = logCurrentToDo;

    
    return (
        <div className={UniStyles.ModalBackGround} onClick={() => { props.closeToDoModal() }} >
            <div className={UniStyles.ModalBody} onClick={(e) => { e.stopPropagation() }}>
                <input required type="text" name="name" value={newTodo.name} placeholder="Exciting task name here!"
                    className={`${UniStyles.generic_input}` }
                    onInput={(e) => {
                    updateStateField(newTodo, setNewTodo, "name", e.target.value)
                }}></input>
                <textarea className={`${UniStyles.generic_input}`} type="textarea" name="description" value={newTodo.description } placeholder="What is this task about" rows={10} onChange={(e) => { updateStateField(newTodo, setNewTodo, "description", e.target.value) }}></textarea>
                <section className={`${Styles.DualSection} ${UniStyles.generic_input}`}>
                    <input className={`${Styles.input_date} ${UniStyles.generic_input}`} type="date" name="startDate" value={newTodo.startDate} onChange={(e) => { updateStateField(newTodo, setNewTodo, "startDate", e.target.value) }}></input>
                    <input className={`${Styles.input_date} ${UniStyles.generic_input}`} type="date" name="endDate" value={newTodo.endDate} onChange={(e) => { updateStateField(newTodo, setNewTodo, "endtDate", e.target.value) }}></input>
                </section>
                <section className={`${UniStyles.DualSection}`}>
                    <button onClick={() => { props.closeToDoModal(); }}>Cancel</button>
                    <button onClick={() => {
                        if (validateTodo()) {
                            callAPIAsync("ToDoService", "CreateToDo", "POST", newTodo);
                            props.closeToDoModal();
                            props.fetchToDos();
                        } else {
                            console.log("not valid todo")
                        }
                    }}>Submit</button>
                </section>
            </div>
        </div>
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