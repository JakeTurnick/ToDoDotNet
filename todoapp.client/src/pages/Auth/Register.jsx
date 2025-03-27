import { useNavigate, Link } from 'react-router';
import { useActionState } from 'react';
import { callAPIAsync } from "@/lib/functions.js"

const Register = () => {
    const [message, formAction, isPending] = useActionState(handleRegister, null)

    async function handleRegister(initialState, formData) {
        console.log("registering")
        const user = {
            "Email": formData.get("email"),
            "Password": formData.get("password")
        }

        const response = await callAPIAsync("POST", "Accounts", "Register", user)
        console.log("login response: ", response)
    }
  return (
      <div>
          <form action={formAction} className="mx-auto flex flex-col">
              <label>User:</label>
              <input type="email" name="email" placeholder="Your@email"></input>
              <label>Password:</label>
              <input type="password" name="password" placeholder="super-secret"></input>
              <button type="submit">Register</button>
          </form>
          <br />
          <Link to={{
              pathname: "/home"
          } }>Return home</Link>
      </div>
  );
}

export default Register;