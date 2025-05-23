import styles from "./QAM.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import QAMItem from "./QAM_Item";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '@/authProvider';
import { useNavigate } from "react-router";
import { callAPIAsync } from "../functions";


export default function QAM() {
    const [isOpen, setIsOpen] = useState(false);

    const { authStatus, setAuthStatus } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("logout redirecting")
        callAPIAsync("post", "Accounts", "logout").then((response) => {
            setAuthStatus(false);
            navigate("/", { replace: true });
        })
        
    };

    
    // {`${styles.QAM_Container} ${isOpen ? styles.open : styles.closed}`}
    return (
        <section className={`${styles.QAM_Container} ${isOpen ? styles.open : styles.closed}`}>
            <article className={styles.QAM_Header}>
                <FontAwesomeIcon icon="fa-solid fa-user"  />
                <p className={`${isOpen ? styles.open : styles.closed}`}>User name</p>
                <button onClick={() => { setIsOpen(!isOpen) }}>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" className={`${styles.QAM_Access_btn} ${isOpen ? styles.open : styles.closed}`} />
                </button>
            </article>
            <nav className={styles.QAM_Nav}>
                <QAMItem text={"Home"} link={"/Home"} isOpen={isOpen} icon={<FontAwesomeIcon icon="fa-solid fa-house" className={`${styles.QAM_Item_Icon} ${isOpen ? styles.open : styles.closed}`} />}></QAMItem>
                {authStatus ?
                    <QAMItem text={"To Do's"} link={"/ToDos"} isOpen={isOpen} icon={<FontAwesomeIcon icon="fa-solid fa-list-check" className={`${styles.QAM_Item_Icon} ${isOpen ? styles.open : styles.closed}`} />}></QAMItem>
                    : ""}
                
            </nav>
            {authStatus ?
                <button
                    onClick={handleLogout}
                    style={{alignSelf: "end"} }
                >
                    Logout
                </button>
                : 
                <button
                    onClick={() => { navigate("/login") }}
                    style={{ alignSelf: "end" }}
                >
                    Login
                </button>
            }
        </section>
    )
}