import { useState, useEffect } from "react";
import {useSearchParams} from "react-router-dom";
import merge from "lodash/merge"

const useNavState = (placeholder = {}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState(merge(placeholder, Object.fromEntries(searchParams)));

    useEffect(() => {
        const newSearchParams = new URLSearchParams();
        Object.entries(state).forEach(([key, value]) => {
            if(value) {
                newSearchParams.set(key, value);
            }
        })
        setSearchParams(newSearchParams);
    }, [state]);

    return [state, setState];
}

export default useNavState;