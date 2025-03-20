import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../api/axiosInstance"

const initialState = {
    statusCode: null,
    message: null,
    data : {}
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (userId, {rejectedWithValue}) => {
        try {
            const response = await axiosInstance.get(`/categories`)
            // console.log(response)
            return response.data
        } catch (error) {
            return rejectedWithValue(error.response.data)
        }
    }
)

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async (category, {rejectedWithValue}) => {
        try {
            const response = await axiosInstance.put('/categories', category)
            return response.data
        } catch (error) {
            return rejectedWithValue(error.response.data)
        }
    }
)

const profileSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.statusCode = 'succeeded'
            state.data = action.payload.data
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            state.statusCode = 'succeeded'
            state.data = action.payload.data
        })
        .addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            }
        );
    }
})

export default profileSlice.reducer