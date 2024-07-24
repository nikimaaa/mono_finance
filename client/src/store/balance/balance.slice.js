import {createSlice} from '@reduxjs/toolkit'
import {fetchBalance} from "./balance.actions.js";

const initialState = {
    total: 0,
    creditLimit: 0,
    realBalance: 0,
    monthlyExpenses: 0,
    balanceAfterMonthlyExpenses: 0,
    reservedExpenses: 0,
    freeBalance: 0,
    isLoading: false
}

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                return  {...state, isLoading: false, ...action.payload};
            })
            .addCase(fetchBalance.rejected, (state) => {
                return initialState;
            })
    }
})

export default balanceSlice.reducer