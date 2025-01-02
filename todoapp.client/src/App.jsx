import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router"
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
import styles from "./App.module.css"

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [SBCollapsed, setSBCollapsed] = useState(false)

    const fullDivStyle = {
        display: "flex",
    };


    return (
        <div style={fullDivStyle}>
            <aside className={styles.SideBar }>
                <Sidebar
                    //backgroundColor="rgb(100, 30, 250, 1)"
                    collapsed={false }
                    onBackdropClick={() => { setSBCollapsed(true) }}
                >
                    <Menu>
                        <MenuItem component={<Link to="/Home" />} rootStyles={styles.MenuItem}>Home</MenuItem>
                        <MenuItem component={<Link to="/Login" />}>Login</MenuItem>
                        <MenuItem component={<Link to="/ToDos" />}>To Dos</MenuItem>
                    </Menu>
                </Sidebar>
            </aside>
            <main style={{ padding: "10px" }}>
                <Outlet />
                
            </main>
            
        </div>
    )
}

