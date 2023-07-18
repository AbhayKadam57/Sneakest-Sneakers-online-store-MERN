import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import ImageContainer from "./ImageContainer";
import SingleProductDetail from "./SingleProductDetail";
import { tablet } from "../responsive";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  margin: 50px 40px;
  ${tablet({ flexDirection: "column", gap: "30px" })}
`;

function ProductDetails() {
  return (
    <Container>
      <ImageContainer />
      <SingleProductDetail />
    </Container>
  );
}

export default ProductDetails;
