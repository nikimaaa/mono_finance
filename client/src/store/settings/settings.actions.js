import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSettings = createAsyncThunk(
    'settings/fetch',
    async () => {
        const response = await axios.get('/api/settings');

        return response.data;
    }
)

export const fetchSingleSetting = createAsyncThunk(
    'settings/singleFetch',
    async (key) => {
        const response = await axios.get(`/api/settings/${key}`);

        return response.data;
    }
)

export const updateSetting = createAsyncThunk(
    'settings/update',
    async ({key, value}) => {
        const response = await axios.put(`/api/settings/${key}`, value);

        return response.data;
    }
)