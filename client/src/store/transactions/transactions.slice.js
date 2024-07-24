import {createSlice} from '@reduxjs/toolkit'
import {fetchTransactions, fetchTransactionsSummary} from "./transactions.actions.js";

const initialState = {
    items: [],
    pagesCount: 1,
    summary: {
        isFetched: false,
        incomes: 0,
        expenses: 0
    },
    isFetched: false
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
      clearTransactions: (state) => {
        state.items = [];
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isFetched = false;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                const {transactions, pagesCount} = action.payload;
                state.isFetched = true;
                state.items = transactions;
                state.pagesCount = pagesCount;
            })
            .addCase(fetchTransactions.rejected, (state) => {
                state.isFetched = true;
                state.items = [];
            })
            .addCase(fetchTransactionsSummary.pending, (state) => {
                state.summary.isFetched = false;
            })
            .addCase(fetchTransactionsSummary.fulfilled, (state, action) => {
                const {incomes, expenses} = action.payload;

                state.summary.isFetched = true;
                state.summary.incomes = incomes;
                state.summary.expenses = expenses;
            })
            .addCase(fetchTransactionsSummary.rejected, (state, action) => {
                state.summary.isFetched = true;
            })
    }
})

export const {clearTransactions} = transactionsSlice.actions;

export default transactionsSlice.reducer