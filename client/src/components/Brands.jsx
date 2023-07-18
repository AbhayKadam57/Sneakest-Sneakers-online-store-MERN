import React from "react";
import styled from "styled-components";
import { data } from "../data.js";

const Container = styled.div`
  padding: 18px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
`;
const Name = styled.p`
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const Brands = () => {
  return (
    <Container>
      {data.map((item) => (
        <Name id={item.id}>{item.name}</Name>
      ))}
    </Container>
  );
};

export default Brands;
