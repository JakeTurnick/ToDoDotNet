import { BrowserRouter, Routes, Route } from 'react-router'
import { useAuth } from '@/authProvider'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import Logout from '@/pages/Auth/Logout'
import Login from '@/pages/Auth/Login'

const RouteIndex = () => {
    const { token } = useAuth();

    /* const routesForPublic = [
        {
            path: "/somepath",
            element: <div>some public element</div>
        }
    ]

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <div>Protected route 1</div>
                },
                {
                    path: "/logout",
                    element: <Logout />
                }

            ]
        }
    ]

    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <div>For non auth users - a home page describing the app</div>
        },
        {
            path: "/login",
            element: <Login />
        }
    ]

    const router = createBrowserRouter([
        ...routesForPublic,
        (!token ? routesForNotAuthenticatedOnly : []),
        routesForAuthenticatedOnly
    ])
    */

    return (
        <BrowserRouter>
            <Routes>
                {/* Not-Auth */}
                <Route path="/" element={<div>A fake homepage for non auth users</div>} />
                <Route path="/login" element={<Login /> } />
                {/* Public */}
                <Route path="/home" element={<div>Public page for everyone</div> } />
                {/* AuthOnly */}
                <Route path="/" element={<ProtectedRoute />} >
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}



export default RouteIndex;