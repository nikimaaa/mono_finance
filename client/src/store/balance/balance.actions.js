import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBalance = createAsyncThunk(
    'balance/fetch',
    async () => {
        const response = await axios.get('/api/dashboard/balance');

        return response.data;
    }
)