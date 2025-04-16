import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:5000/products/"

export const fetchPost = createAsyncThunk('posts/updatePosts',async()=>{
    const response = await axios.get(URL);
    console.log("nswdebded",response.data);
    
    return response.data;
})


const postSlice = createSlice({
    name:'posts',
    initialState:{
        posts:[],
        loading:false,
        error:null,
    },

    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPost.pending,(state)=>{
            state.loading = true;
        })

        .addCase(fetchPost.fulfilled,(state,action)=>{
            state.loading= false;
            state.posts = action.payload;
        })

        .addCase(fetchPost.rejected,(state,action)=>{
            state.loading=false;
            state.posts = action.error.message;
        })
    }
})

export default postSlice.reducer;
