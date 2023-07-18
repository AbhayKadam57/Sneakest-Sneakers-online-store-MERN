import React from "react";
import styled from "styled-components";
import CartSection from "../components/CartSection";
import Footer from "../components/Footer";
import Info from "../components/Info";
import Navbar from "../components/Navbar";

const Container = styled.div``;

const Cart = () => {
  return (
    <Container>
      <Navbar />
      <CartSection />
      <Info />
      <Footer />
    </Container>
  );
};

export default Cart;
