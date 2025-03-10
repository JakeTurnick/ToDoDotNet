import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/authProvider.jsx";

export const ProtectedRoute = () => {
    const token = useAuth();

    console.log("Protected Route, token? ", token, " ! ", !token)

    if (!token) {
        return <Navigate to="/" />;
    }

    return <Outlet />
}