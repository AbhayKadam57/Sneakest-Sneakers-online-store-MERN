import React from "react";
import styled from "styled-components";
import { store } from "../data";
import Stores from "./Stores";
import { mobile } from "../responsive";

const Container = styled.div`
  margin: 50px 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  ${mobile({ height: "100%" })}
`;

const Title = styled.h2`
  margin-bottom: 20px;
  opacity: 0.8;
`;

const Box = styled.div`
  height: 100%;
  display: flex;
  gap: 10px;
  ${mobile({ flexDirection: "column" })}
`;

const Store = () => {
  return (
    <Container>
      <Title>STORES</Title>

      <Box style={{ display: "flex" }}>
        {store.map((item) => (
          <Stores key={item.id} item={item} />
        ))}
      </Box>
    </Container>
  );
};

export default Store;
