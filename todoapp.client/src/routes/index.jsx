import { BrowserRouter, Routes, Route } from 'react-router'
import { useAuth } from '@/authProvider'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import App from '@/App.jsx'
import Logout from '@/pages/Auth/Logout'
import Login from '@/pages/Auth/Login'
import ToDoManager from '@/pages/ToDoManager'


const RouteIndex = () => {
    const { token } = useAuth();

    const PrintToken = () => {
        console.log({token})
    }

    window.PrintToken = PrintToken;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    {/* App's Outlet */}

                    {/* Public */}
                    <Route path="/home" element={<div>Public page for everyone</div> } />
                
                    {token ?
                        /* AuthOnly */
                        <Route path="/" element={<ProtectedRoute />} >
                            <Route path="/" element={<div>Authed login</div>} />
                            <Route path="ToDos" element={<ToDoManager />} />
                        </Route>
                        : 
                        /* Not-Auth */
                        <Route path="/">
                            <Route path="/" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/register" element={<div>register for an account</div> } />
                        </Route>
                    }
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteIndex;