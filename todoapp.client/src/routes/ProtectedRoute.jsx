import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/authProvider.jsx";

export const ProtectedRoute = () => {
    const token = useAuth();

    //console.log("Protected Route, token? ", token, " ! ", !token)

    if (!token) {
        console.log("No auth token, redirecting")
        return <Navigate to="/" />;
    }

    return <Outlet />
}