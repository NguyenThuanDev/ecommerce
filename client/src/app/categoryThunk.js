import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCategories } from '../apis/app'
export const getCatories = createAsyncThunk(
    'category/get',
    async (data, { rejectWithValue }) => {
        try {
            const rs = await apiGetCategories();

            return rs;
        } catch (error) {
            return rejectWithValue(error.message)
        }


    })


