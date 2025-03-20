import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../api/axiosInstance"

const initialState = {
    statusCode: null,
    message: null,
    data : []
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, {rejectedWithValue}) => {
        try {
            const response = await axiosInstance.get('/products')
            return response.data
        } catch (error) {
            return rejectedWithValue(error.response.data)
        }
    }
)

export const createProduct = createAsyncThunk(
    'products/createProducts', 
    async (product, {rejectedWithValue}) => {
        try {
            const response = await axiosInstance.post('/products', product, {
                headers: {}
            });
            return response.data
        } catch (error) {
           return rejectedWithValue(error.response.data)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProducts',
    async (product, {rejectedWithValue}) => {
        try {
            const response = await axiosInstance.put('/products', product)
            return response.data
        } catch (error) {
           return rejectedWithValue(error.response.data)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProducts',
    async (id, {rejectedWithValue}) => {
        try {
            const response = await axiosInstance.delete(`/products/${id}`)
            return response.data
        } catch (error) {
           return rejectedWithValue(error.response.data)
        }
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.statusCode = 'succeeded';
            state.data = action.payload.data;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload);
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            const index = state.data.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
            state.status = 'succeeded';
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.data = state.data.filter((merch) => merch.id !== action.meta.arg);
            state.status = 'succeeded';
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

export default productSlice.reducer