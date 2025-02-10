import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice";


const Product = ()=>{

    const dispatch = useDispatch();
    const {products,loading,error}= useSelector((state)=>state.products);

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);




    return(
        <div>
            <h2>Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {products.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
        </div>
    )
}

export default Product;