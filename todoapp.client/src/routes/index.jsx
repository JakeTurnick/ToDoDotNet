import { BrowserRouter, Routes, Route } from 'react-router'
import { useAuth } from '@/authProvider'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import App from '@/App.jsx'
import Logout from '@/pages/Auth/Logout'
import Login from '@/pages/Auth/Login'
import ToDoManager from '@/pages/ToDoManager'
import { PageNotFound } from './PageNotFound'
import Register from '@/pages/Auth/Register'
import NotFoundRedirect from './NotFoundRedirect'
import { useEffect } from 'react'


const RouteIndex = () => {
    const { token } = useAuth();

    //console.log("routes initialized ", token)

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
                            <Route path="/ToDos" element={<ToDoManager />} />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                        : 
                        /* Not-Auth */
                        <Route path="/">
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                    }

                    <Route path="*" element={<NotFoundRedirect />} />
                    <Route path="PageNotFound" element={<PageNotFound /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteIndex;