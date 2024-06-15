import React from "react";
import styles from "./Button.module.scss"

const Button = ({children, style, onClick, disabled}) => {
    return (
        <button className={styles.button} style={style} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button;