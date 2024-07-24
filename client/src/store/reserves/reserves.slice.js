import {createSlice} from '@reduxjs/toolkit'
import {createReserve, deleteReserve, fetchReserves, fetchReservesTotal, updateReserve} from "./reserves.actions.js";

const initialState = {
    items: [],
    total: 0,
    isFetchedTotal: false,
    isFetched: false,
    isLoading: false
}

export const reservesSlice = createSlice({
    name: 'reserves',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchReserves.pending, (state) => {
                state.isFetched = false;
            })
            .addCase(fetchReserves.fulfilled, (state, action) => {
                state.isFetched = true;
                state.items = action.payload;
            })
            .addCase(createReserve.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createReserve.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteReserve.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReserve.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateReserve.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReserve.fulfilled, (state, action) => {
                const updatedReserve = action.payload;

                state.isLoading = false;
                state.items = state.items.map(
                    (item) => item.id === updatedReserve ? updatedReserve : item
                );
            })
            .addCase(fetchReservesTotal.pending, (state) => {
                state.isFetchedTotal = false;
            })
            .addCase(fetchReservesTotal.fulfilled, (state, action) => {
                state.isFetchedTotal = true;
                state.total = action.payload;
            })
    }
})

export default reservesSlice.reducer