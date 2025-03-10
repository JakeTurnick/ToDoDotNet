import { useNavigate } from "react-router";
import { useAuth } from '@/authProvider';

export const PageNotFound = () => {

    const { token } = useAuth();

    const navigate = useNavigate();
    setTimeout(() => {
        navigate("/", {replace: true})
    }, 5 * 1000);


    let code = token ?
        "404" :
        "401"
    let message = token ?
        "Page not found" :
        "Not Authorized for this page"


  return (
    <>
          <h1>{code}</h1>
          <h3>{message}</h3>
        <p>... how did you get here?</p>
        <p>Redirecting shortly</p>
    </>
  );
}

