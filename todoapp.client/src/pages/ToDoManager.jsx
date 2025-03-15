import { useState, useEffect, createContext } from 'react';
import { createPortal } from 'react-dom';
import { callAPIAsync } from "@/lib/functions.js"
import CreateToDo from "./ToDos/CreateToDo";
import ViewToDos from './ToDos/ViewToDos';
import axios from 'axios'

export default function ToDoManager() {
    const [showModal, setShowModal] = useState(false);
    const [toDos, setToDos] = useState([]);
    const [ToDoCard, setToDoCard] = useState(<CreateToDo closeToDoModal={closeToDoModal} fetchToDos={fetchToDos} />);
    const ToDoContext = createContext({
        closeToDoModal,
        showToDoModal,
        fetchToDos
    })

    async function fetchToDos() {
        const response = await callAPIAsync("GET", "ToDoService", "GetToDos");
        setToDos(response.data)
        //try {
        //    const response = await axios({
        //        method: "get",
        //        url: "https://localhost:7152/ToDoService/GetToDos",
        //        responseType: "json"
        //    })

        //    console.log({response})
        //    setToDos(response.data)
        //} catch (error) {
        //    console.log("axios error ", error)
        //}
        
    }

    function closeToDoModal() {
        setShowModal(false)
    }
    /*
    TODO: (haha)

    Create page variable to hold modal,
    update modal variable, {showModal && modalVariable}
    */

    function showToDoModal(id) {
        let EditToDo;
        if (id != null) {
            EditToDo = toDos.find(todo => todo.id == id)
        }
        //console.log(`show todo id: ${id} `, { EditToDo })

        setToDoCard(<CreateToDo todo={EditToDo} closeToDoModal={closeToDoModal} fetchToDos={fetchToDos} />);
        if (showModal !== true) {
            setShowModal(true)
        }
        return createPortal(
            ToDoCard,
            document.body
        )
    }

    document.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            setShowModal(false)
        }
    })
    

    useEffect(() => {
        fetchToDos()
    }, [])

    return (
        <>
            <button onClick={() => {
                setToDoCard(<CreateToDo closeToDoModal={closeToDoModal} fetchToDos={fetchToDos} />)
                setShowModal(true)
            }}>
                Create with portal
            </button>
            {showModal && createPortal(ToDoCard, document.body)}
            <ViewToDos ToDos={toDos} showToDoModal={showToDoModal } />
        </>
    )
}
