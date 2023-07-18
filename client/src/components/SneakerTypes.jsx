import React from "react";
import styled from "styled-components";
import { Types } from "../data.js";

const Container = styled.div`
  padding: 18px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
`;
const Name = styled.p`
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const TypePopup = () => {
  return (
    <Container>
      {Types.map((item) => (
        <Wrapper>
          <Name id={item.id}>{item.type}</Name>
        </Wrapper>
      ))}
    </Container>
  );
};

export default TypePopup;
