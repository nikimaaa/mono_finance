import React from "react";
import styles from "./Card.module.scss";

const Card = ({children, padding = 20}) => {
    return (
        <div className={styles.card} style={{padding}}>
            {children}
        </div>
    )
}

export default Card