import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchPost } from "../redux/postSlice";


const Post = ()=>{

    const dispatch = useDispatch();
    const {posts,loading,error}= useSelector((state)=>state.posts);

    useEffect(()=>{
        dispatch(fetchPost());
    },[dispatch]);


    return(
      <div>
      <h2>Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {Array.isArray(posts) && posts.length > 0 ? (  // api not working message will display
          posts.map((post) => (
            <li key={post.id}>
              <strong>{post.name}</strong>
              <p>{post.description}</p>
            </li>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
    )
}

export default Post;