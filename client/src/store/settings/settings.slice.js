import {createSlice} from '@reduxjs/toolkit'
import {fetchSettings, fetchSingleSetting, updateSetting} from "./settings.actions.js";

const initialState = {
    data: {},
    isFetched: false,
    isLoading: false
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.isFetched = false;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.isFetched = true;
                state.data = action.payload;
            })
            .addCase(fetchSingleSetting.pending, (state) => {
                state.isFetched = false;
            })
            .addCase(fetchSingleSetting.fulfilled, (state, action) => {
                const {key, value} = action.payload;
                state.isFetched = true;
                state.data[key] = value;
            })
            .addCase(updateSetting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSetting.fulfilled, (state, action) => {
                const {key, value} = action.payload;
                state.isLoading = false;
                state.data[key] = value;
            })
    }
})

export default settingsSlice.reducer