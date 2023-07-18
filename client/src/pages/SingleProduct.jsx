import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Info from "../components/Info";
import Navbar from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";
import RelatedComponents from "../components/RelatedComponents";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
const Container = styled.div``;

const Path = styled.div`
  margin: 20px 40px;
`;

const SingleProduct = () => {
  return (
    <Container>
      <Navbar />
      <Path>
        <h3>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
        </h3>
      </Path>
      <ProductDetails />
      <RelatedComponents />
      <Info />
      <Footer />
    </Container>
  );
};

export default SingleProduct;
