import React from "react";
import styles from "./Stack.module.scss"

const Stack = ({children, justifyContent = "space-between", alignItems = "stretch", gap = 10, flexDirection = "row"}) => {
    return (
        <div className={styles.stack} style={{justifyContent, alignItems, gap, flexDirection}}>{children}</div>
    )
}

export default Stack;