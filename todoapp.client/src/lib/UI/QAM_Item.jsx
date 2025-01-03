import styles from "./QAM.module.css";
import { NavLink } from "react-router";

export default function QAMItem({link, text, icon }) {

    return (
        <div>
            <NavLink to={link} className={styles.QAM_Item_Body } >
                {icon}
                <button className={styles.QAM_Item_btn }>{text}</button>
            </NavLink>
        </div>
    )
}