import styles from "./QAM.module.css";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";

export default function QAMItem({ link, text, icon, isOpen }) {
   
    return (
        <div>
            <NavLink to={link} className={`${styles.QAM_Item_Body} `} >
                <button className={`${styles.QAM_Item_btn} ${isOpen ? styles.open : styles.closed}`}>
                    {icon} <p className={`${isOpen ? styles.open : styles.closed}`}>{text}</p>
                </button>
            </NavLink>
        </div>
    )
}