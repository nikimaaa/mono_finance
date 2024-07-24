import { configureStore } from '@reduxjs/toolkit'
import reserves from "./reserves/reserves.slice.js"
import transactions from "./transactions/transactions.slice.js"
import settings from "./settings/settings.slice.js"
import balance from "./balance/balance.slice.js"

const store = configureStore({
    reducer: {
        reserves,
        transactions,
        settings,
        balance
    }
})

export default store;