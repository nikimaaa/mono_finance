import React from "react";
import styles from "./Modal.module.scss"
import Stack from "../Stack/Stack.jsx";

const Modal = ({open, onClose, title, children, actions}) => {
    if (!open) {
        return null;
    }

    return (
        <div className={styles.modal_overlay} onClick={onClose}>
            <div className={styles.modal_wrapper} onClick={(e) => e.stopPropagation()}>
                <h4 className={styles.modal_title}>{title}</h4>
                <div className={styles.modal_content}>{children}</div>
                <div className={styles.modal_actions}>
                    <Stack>
                        {actions}
                    </Stack>
                </div>
            </div>
        </div>
    )
}

export default Modal;