import { useAuth } from '@/authProvider'
import { useNavigate, Link } from 'react-router'
import { useActionState, useEffect } from 'react';
import { callAPIAsync } from "@/lib/functions.js"

const Login = () => {
    const { authStatus, setAuthStatus } = useAuth();
    const navigate = useNavigate();
    const [message, formAction, isPending] = useActionState(handleLogin, null)

    async function handleLogin(initialState, formData) {
        const user = {
            "Email": formData.get("email"),
            "Password": formData.get("password")
        }

        await callAPIAsync("POST", "Accounts", "Login", user).then((response) => {
            if (response.status == 200) {
                console.log(response)
                console.log(document.cookie)
                setAuthStatus(true)
            }

            setTimeout(() => {
                navigate("/home")
            }, 1) // hey man, I don't notice any difference but my headache is gone
        })
    };


    return (
        <>
            <form action={formAction} className="mx-auto flex flex-col">
                <label>User:</label>
                <input type="email" name="email" placeholder="Your@email"></input>
                <label>Password:</label>
                <input type="password" name="password" placeholder="super-secret"></input>
                <button type="submit">Login</button>
            </form>
            
            <br />
            <article>
                <Link to={{
                    pathname: "/register"
                }}>
                    Don&apos;t have an account? - sign up!
                </Link>
            </article>
        </>
    );
};

export default Login;