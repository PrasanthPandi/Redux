import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../redux/productSlice';


export const store = configureStore({
    reducer:{
        products:productsReducer,
    }
})