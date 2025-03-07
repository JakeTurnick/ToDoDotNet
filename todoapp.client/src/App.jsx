import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router"
import AuthProvider from '@/authProvider'
import RouteIndex from '@/routes/index'
import QAM from "./lib/UI/QAM"
import styles from "./App.module.css"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faListCheck, faHouse, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronRight, faListCheck, faHouse, faUser)

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [SBCollapsed, setSBCollapsed] = useState(false)

    const fullDivStyle = {
        display: "flex",
    };

    return (
        <div style={fullDivStyle}>
            <aside className={styles.SideBar}>
                <QAM></QAM>

            </aside>
            <main style={{ padding: "10px" }}>
                <Outlet />

            </main>

        </div>
    )
}
