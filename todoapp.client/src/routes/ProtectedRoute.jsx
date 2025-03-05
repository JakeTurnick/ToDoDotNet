import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/authProvider.jsx";

export const ProtectedRoute = () => {
    const token = useAuth();

    if (!token) {
        return <Navigate to="/home" />;
    }

    return <Outlet />
}