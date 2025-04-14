import axios from 'axios';
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { callAPIAsync } from "@/lib/functions.js"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authStatus, setAuthStatus_] = useState(false);

    const setAuthStatus = (newAuthStatus) => {
        setAuthStatus_(newAuthStatus);
    };

    function testAuthCheck() {
        callAPIAsync("Get", "Accounts", "AuthCheck").then((response) => {
            if (response.status == 200) {
                console.log(response)
                setAuthStatus(true)
            }
        })
    }

    window.testAuthCheck = testAuthCheck


    useEffect(() => {
        callAPIAsync("Get", "Accounts", "AuthCheck").then((response) => {
            if (response.status == 200) {
                console.log(response)
                setAuthStatus(true)
            }
        })
    }, [])

    const contextValue = useMemo(
        () => ({
            authStatus,
            setAuthStatus,
        }),
        [authStatus]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;