import { Link, Outlet } from 'react-router'

export default function ToDoManager() {


    return (
        <>
            <h3>ToDos go here</h3>
            <p> </p>
            <Link to="/ToDos/Create">Create new</Link>
            <Outlet />
        </>
    )
}
