import { useNavigate, Link } from 'react-router';

function Register() {
  return (
      <div>
          <Link to={{
              path: "/home"
          } }>Return home</Link>
      </div>
  );
}

export default Register;