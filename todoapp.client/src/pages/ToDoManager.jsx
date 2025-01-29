import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { callAPIAsync } from "@/lib/functions.js"
import CreateToDo from "./ToDos/CreateToDo";
import ViewToDos from './ToDos/ViewToDos';

export default function ToDoManager() {
    const [showModal, setShowModal] = useState(false);
    const [toDos, setToDos] = useState([]);

    function closeCreateModal() {
        setShowModal(false)
    }

    async function fetchToDos() {
        await callAPIAsync("ToDoService", "GetToDos", "GET")
            .then(data => {
                if (data.error) {
                    console.error("CallAPI Error: ", data.error)
                } else {
                    console.log(data)
                    setToDos(data)
                }
            });
    }

    useEffect(() => {
        fetchToDos()
    }, [])

    return (
        <>
            <h3>ToDos go here</h3>
            <button onClick={() => {
                setShowModal(!showModal)
            }}>
                Create with portal
            </button>
            {showModal && createPortal(
                <CreateToDo closeCreateModal={closeCreateModal} fetchToDos={fetchToDos } />,
                document.body
            )}
            <ViewToDos ToDos={toDos} />
        </>
    )
}
