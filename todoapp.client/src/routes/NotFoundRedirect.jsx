import { useNavigate } from "react-router";
import { useEffect } from 'react';

function NotFoundRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/PageNotFound")
    })
  return (
    <></>
  );
}

export default NotFoundRedirect;