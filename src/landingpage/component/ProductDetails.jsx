import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../../redux/productSlice';

const ProductDetails = () => {
  const { id } = useParams(); // This fetches the ID from the URL params
  const dispatch = useDispatch();
  const { productDetails, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id)); // Dispatch the action to fetch product details by ID
    }
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (productDetails) {
    return (
      <div>
        <h2>{productDetails.name}</h2>
        <img src={productDetails.image} alt={productDetails.name} width="200" height="auto" />
        <p>{productDetails.description}</p>
        <p>Price: ${productDetails.price}</p>
      </div>
    );
  }

  return <p>Product not found</p>;
};

export default ProductDetails;
