import {createSlice} from '@reduxjs/toolkit'
import {
    fetchTransactions,
    fetchTransactionsCategoriesStat,
    fetchTransactionsDailyStat,
    fetchTransactionsSummary
} from "./transactions.actions.js";

const initialState = {
    items: [],
    pagesCount: 1,
    summary: {
        isFetched: false,
        incomes: 0,
        expenses: 0
    },
    dailyStat: {
      isFetched: false,
      data: []
    },
    categoriesStat: {
        isFetched: false,
        data: []
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
            .addCase(fetchTransactionsDailyStat.pending, (state) => {
                state.dailyStat.isFetched = false;
            })
            .addCase(fetchTransactionsDailyStat.fulfilled, (state, action) => {
                const data = action.payload;

                state.dailyStat.isFetched = true;
                state.dailyStat.data = data;
            })
            .addCase(fetchTransactionsDailyStat.rejected, (state, action) => {
                state.dailyStat.isFetched = true;
            })
            .addCase(fetchTransactionsCategoriesStat.pending, (state) => {
                state.categoriesStat.isFetched = false;
            })
            .addCase(fetchTransactionsCategoriesStat.fulfilled, (state, action) => {
                const data = action.payload;

                state.categoriesStat.isFetched = true;
                state.categoriesStat.data = data;
            })
            .addCase(fetchTransactionsCategoriesStat.rejected, (state, action) => {
                state.categoriesStat.isFetched = true;
            })
    }
})

export const {clearTransactions} = transactionsSlice.actions;

export default transactionsSlice.reducer