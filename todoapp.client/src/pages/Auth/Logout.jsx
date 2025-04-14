import { useNavigate } from "react-router";
import { useAuth } from "@/authProvider";

const Logout = () => {
    const { setAuthStatus } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("logout redirecting")
        setAuthStatus(false);
        navigate("/", { replace: true });
    };

    setTimeout(() => {
        handleLogout();
    }, 3 * 1000);

    return <>Logout Page</>;
};

export default Logout;
// don't need a whole page for a logout