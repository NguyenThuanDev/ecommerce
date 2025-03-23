import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCatories } from './categoryThunk'





const categorySlice = createSlice({
    name: 'category',
    initialState: {
        isloading: true,
        categories: []

    },
    reducers: {
        add: (state, action) => {
            state.push(action.payload)
        }


    },
    extraReducers: (builder) => {
        builder.addCase(getCatories.pending, (state) => {
            state.isloading = true;
        })
        builder.addCase(getCatories.fulfilled, (state, action) => {
            state.isloading = false;
            state.categories = action.payload
        })
        builder.addCase(getCatories.rejected, (state, action) => {
            state.isloading = false;
            state.categories = action.payload.message
        })
    }






})

export const { add } = categorySlice.actions;
export default categorySlice.reducer;