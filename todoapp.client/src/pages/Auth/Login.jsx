import { useAuth } from '@/authProvider'
import { useNavigate, Link } from 'react-router'
import { useActionState } from 'react';
import { callAPIAsync } from "@/lib/functions.js"

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [message, formAction, isPending] = useActionState(handleLogin, null)

    async function handleLogin(initialState, formData) {
        const user = {
            "Email": formData.get("email"),
            "Password": formData.get("password")
        }

        const response = await callAPIAsync("POST", "Accounts", "Login", user)

        if (response.status == 200) {
            setToken(response.data.token)
            navigate("/home", { replace: true })
        }

        // if (response.errors <= 0)
        //navigate("/", { replace: true });
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