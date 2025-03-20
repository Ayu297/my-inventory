import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice.js";
import merchandisesReducer from './features/productSlice.js'
import artistReducer from './features/categorySlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: merchandisesReducer,
    artist: artistReducer
  },
});
