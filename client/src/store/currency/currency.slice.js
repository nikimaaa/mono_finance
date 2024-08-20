import {createSlice} from '@reduxjs/toolkit'
import {fetchCurrencyHistory} from "./currency.actions.js";

const initialState = {
    data: [{
        "exchangedate": "06.08.2024",
        "r030": 840,
        "cc": "USD",
        "txt": "Долар США",
        "enname": "US Dollar",
        "rate": 0.00,
        "units": 1,
        "rate_per_unit": 0.00,
        "group": "1",
        "calcdate": "05.08.2024"
    }],
    isLoading: false
}

export const currencySlice = createSlice({
    name: 'balance',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrencyHistory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrencyHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCurrencyHistory.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export default currencySlice.reducer