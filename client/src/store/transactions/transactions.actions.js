import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTransactions = createAsyncThunk(
    'transactions/fetch',
    async (filters) => {
        const {sort, ...rest} = filters;
        const [sortBy, sortOrder] = sort.split("-");
        const queryObject = {...rest, sortBy, sortOrder}

        const searchParams = new URLSearchParams(queryObject);
        const queryString = searchParams.toString();

        const response = await axios(`/api/transactions?${queryString}`);

        return response.data;
    }
)

export const fetchTransactionsSummary = createAsyncThunk(
    'transactions/fetchSummary',
    async () => {
        const response = await axios.get('/api/transactions/summary');

        return response.data;
    }
)