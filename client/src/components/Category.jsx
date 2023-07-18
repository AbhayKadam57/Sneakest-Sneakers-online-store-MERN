import React from "react";
import styled from "styled-components";
import { tablet, mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 32.5%;
  height: 100vh;
  position: relative;
  cursor: pointer;
  ${tablet({ width: "100%" })};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ objectPosition: "center" })};
`;

const Title = styled.h2`
  position: relative;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-transform: uppercase;
  width: 30%;
  text-align: center;
  padding: 3px 5px;
  background-color: black;
  font-family: "Staatliches", cursive;
  letter-spacing: 2px;
`;

const Category = ({ item }) => {
  return (
    <Container>
      <Link style={{ textDecoration: "none" }} to={`/products/${item.gender}`}>
        <Image src={item.type} />

        <Title>{item.gender}</Title>
      </Link>
    </Container>
  );
};

export default Category;
