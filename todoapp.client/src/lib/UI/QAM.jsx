import styles from "./QAM.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import QAMItem from "./QAM_Item";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function QAM() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className={`${styles.QAM_Container} ${isOpen ? styles.open : styles.closed}`}>
            <article className={styles.QAM_Header}>
                <FontAwesomeIcon icon="fa-solid fa-user" />
                {isOpen ? <p>User name</p> : "" }
                <button onClick={() => { setIsOpen(!isOpen) }}>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" className={`${styles.QAM_Access_btn} ${isOpen ? styles.open : styles.closed}`} />
                </button>
            </article>
            <nav className={styles.QAM_Nav}>
                <QAMItem text={"Home"} link={"/Home"} isOpen icon={<FontAwesomeIcon icon="fa-solid fa-house" className={styles.QAM_Item_Icon } />}></QAMItem>
                <QAMItem text={"To Do's"} link={"/ToDos"} isOpen icon={<FontAwesomeIcon icon="fa-solid fa-list-check" className={styles.QAM_Item_Icon} /> }></QAMItem>
            </nav>
        </section>
    )
}