import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrencyHistory = createAsyncThunk(
    'currency/fetch',
    async () => {
        const response = await axios.get("api/currency/history");

        return response.data;
    }
)