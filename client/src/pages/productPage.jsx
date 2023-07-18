import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Info from "../components/Info";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Store from "../components/Store";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Container = styled.div``;

const ProductPage = () => {
  return (
    <Container>
      <Navbar />
      <Product />
      <Store />
      <Info />
      <Footer />
    </Container>
  );
};

export default ProductPage;
