// src/component/Home.js
import React from "react";
import Carousel from "./carousel";
import Product from "./product";

const Home = () => {
  return (
    <div className="container-fluid py-1" style={{ backgroundColor: "#eef2f6" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-12">
          <Carousel />
        </div>

        <div className="col-12 col-md-12">
          <Product/>
        </div>
      </div>
    </div>
  );
};

export default Home;
