import React, {useCallback} from "react";
import styles from "./Input.module.scss"
import Stack from "../Stack/Stack.jsx";

const Input = ({value, onChange, id, label, type = "text"}) => {
    const handleChangeInput = useCallback((e) => {
        const {value, id} = e.target;
        onChange(value, id);
    }, [onChange]);

    return (
        <Stack flexDirection="column" gap={3}>
            <label htmlFor={id} className={styles.input_label}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={handleChangeInput}
                className={styles.input}
            />
        </Stack>
    );
}

export default Input;