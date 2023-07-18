import React from "react";
import styled from "styled-components";
import { category } from "../data";
import Category from "./Category";
import { tablet } from "../responsive";

const Container = styled.div`
  margin: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${tablet({ flexDirection: "column", gap: "20px" })}
`;

const Categories = () => {
  return (
    <Container>
      {category.map((item) => (
        <Category key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default Categories;
