import { Link, Outlet } from 'react-router';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import CreateToDo from "./ToDos/CreateToDo";

export default function ToDoManager() {
    const [showModal, setShowModal] = useState(false);

    function closeCreateModal() {
        setShowModal(false)
    }
    return (
        <>
            <h3>ToDos go here</h3>
            <button onClick={() => {
                setShowModal(!showModal)
            }}>
                Create with portal
            </button>
            {showModal && createPortal(
                <CreateToDo closeCreateModal={closeCreateModal } />,
                document.body
            )}
            <Outlet />
        </>
    )
}
