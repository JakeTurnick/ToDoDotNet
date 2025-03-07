import { useAuth } from '@/authProvider'
import { useNavigate, Link } from 'react-router'

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        setToken("this is a test token");
        navigate("/", { replace: true });
    };


    return (
        <>
            <form className="mx-auto flex flex-col">
                <label>User:</label>
                <input type="email" placeholder="Your@email"></input>
                <label>Password:</label>
                <input type="password" placeholder="super-secret"></input>
            </form>
            <button onClick={handleLogin}>Fake login</button>
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