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
    async (params) => {
        const queryParams = new URLSearchParams(params);
        const response = await axios.get(`/api/transactions/summary?${queryParams.toString()}`);

        return response.data;
    }
)

export const fetchTransactionsDailyStat = createAsyncThunk(
    'transactions/dailyStat',
    async () => {
            const response = await axios.get(`/api/transactions/statistic/daily`);

            return response.data;
    }
);

export const fetchTransactionsCategoriesStat = createAsyncThunk(
    'transactions/categoriesStat',
    async () => {
        const response = await axios.get(`/api/transactions/statistic/category`);

        return response.data;
    }
)