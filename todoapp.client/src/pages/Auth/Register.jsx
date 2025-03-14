import { useNavigate, Link } from 'react-router';

function Register() {


    const handleRegister = () => {
        console.log("registering")
    }
  return (
      <div>
          <form className="mx-auto flex flex-col" onSubmit={handleRegister }>
              <label>User:</label>
              <input type="email" placeholder="Your@email"></input>
              <label>Password:</label>
              <input type="password" placeholder="super-secret"></input>
          </form>
          <button onClick={handleRegister}>Fake login</button>
          <br />
          <Link to={{
              pathname: "/home"
          } }>Return home</Link>
      </div>
  );
}

export default Register;