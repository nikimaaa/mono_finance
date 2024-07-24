import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReserves = createAsyncThunk(
    'reserves/fetch',
    async (filters) => {
        const {sort, ...rest} = filters;
        const [sortBy, sortOrder] = sort.split("-");
        const queryObject = {...rest, sortBy, sortOrder}

        const searchParams = new URLSearchParams(queryObject);
        const queryString = searchParams.toString();

        const response = await axios.get(`/api/reserves?${queryString}`);

        return response.data;
    }
);

export const fetchReservesTotal = createAsyncThunk(
    'reserves/fetchTotal',
    async () => {
        const response = await axios.get(`/api/reserves/total`);

        return response.data;
    }
)

export const createReserve = createAsyncThunk(
    'reserves/create',
    async (reserve) => {
        const response = await axios.post('/api/reserves', reserve);

        return response.data;
    }
);

export const deleteReserve = createAsyncThunk(
    'reserves/delete',
    async (id) => {
        await axios.delete(`/api/reserves/${id}`);

        return id;
    }
);

export const updateReserve = createAsyncThunk(
    'reserve/update',
    async (reserve) => {
        const response = await axios.put(`/api/reserves/${reserve.id}`, reserve);

        return response.data;
    }
);