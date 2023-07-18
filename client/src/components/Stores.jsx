import React from "react";
import styled from "styled-components";
import { tablet } from "../responsive";

const Container = styled.div`
  width: 400px;
  height: 400px;
  background: red;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  ${tablet({ width: "100%" })}
`;
const Overlay = styled.div`
  background-color: black;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h2`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  z-index: 2;
  color: white;
  text-transform: uppercase;
  padding: 5px 10px;
  font-family: "Staatliches", cursive;
  letter-spacing: 2px;
`;

const Stores = ({ item }) => {
  return (
    <Container key={item.id}>
      <Overlay />
      <Image src={item.city} />

      <Title>{item.name}</Title>
    </Container>
  );
};

export default Stores;
