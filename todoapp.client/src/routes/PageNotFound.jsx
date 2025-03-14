import { useNavigate, useLocation } from "react-router";
import { useAuth } from '@/authProvider';
import { useEffect } from 'react'

export const PageNotFound = () => {

    const { token } = useAuth();

    const navigate = useNavigate();
    /*

    I would like to have this redirect but currently:
    1 - useLocation will always be /PageNotFound even if the user navigates elsewhere
    2 - cant call useLocation() inside of a set timeout, to get the location at navigate runtime
    For now: A button will do just fine

    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {

            console.log(location.pathname)
            if (location.pathname == "/PageNotFound") {
                navigate("/", { replace: true })
            }
        }, 5 * 1000);
    }, [])
    */

    let code = token ?
        "404" :
        "401"
    let message = token ?
        "Page not found" :
        "Not Authorized for this page"


  return (
    <>
          <h1>401 / 404</h1>
          <h3>Page was not found, or your are not authorized to view it</h3>
        <p>... how did you get here?</p>
          <button onClick={() => {navigate("/") } }>Return home</button>
    </>
  );
}

