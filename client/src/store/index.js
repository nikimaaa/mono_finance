import { configureStore } from '@reduxjs/toolkit'
import reserves from "./reserves/reserves.slice.js"

const store = configureStore({
    reducer: {
        reserves
    },
})

export default store;