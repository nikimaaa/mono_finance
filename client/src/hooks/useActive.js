import {useState, useCallback} from "react";

const useActive = (initial) => {
    const [active, setActive] = useState(initial);

    const activate = useCallback(() => setActive(true), []);
    const deactivate = useCallback(() => setActive(false), []);
    const toggle = useCallback(() => setActive((value) => !value), []);

    return [active, activate, deactivate, toggle];
}

export default useActive;