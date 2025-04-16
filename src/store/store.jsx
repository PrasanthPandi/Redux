import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../redux/productSlice';
import reducerPost from "../redux/postSlice";
import authReducer from "../redux/authSlice";
import sidebarReducer from "../redux/sidebarSlice";

export const store = configureStore({
    reducer:{
        products:productsReducer,
        posts:reducerPost,
        auth:authReducer,
        sidebar: sidebarReducer,
    }
})