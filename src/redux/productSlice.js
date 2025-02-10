import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API URL
const API_URL = 'https://fakestoreapi.com/products';

// Async thunk to fetch posts

export const fetchProducts= createAsyncThunk('products/setProducts',async()=>{ // this action-type namespace/actionName  this is format 
    const response = await axios.get(API_URL);
    return response.data;
});

// create a Slice

const productsSlice = createSlice({
    name:'products',
    initialState:{
        products:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.loading = true;
        })

        .addCase(fetchProducts.fulfilled,(state,action)=>{  //action inside payload having 
            state.loading = false;
            state.products = action.payload;  // products take from name:'pro----'
        })

        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default productsSlice.reducer;
