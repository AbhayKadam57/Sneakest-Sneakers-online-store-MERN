import React, { useState } from "react";
import styled from "styled-components";
import { Gender } from "../data.js";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TypePopup from "./SneakerTypes.jsx";

const Container = styled.div`
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
  position: relative;
  background-color: white;
  top: 13px;
  left: -15px;
  width: 120%;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
`;

const Popup3 = styled.div`
  position: absolute;
  top: 20%;
  left: 110%;
  color: black;
  min-width: 150px;
  animation: slide 0.2s ease-in-out forwards;
  background-color: white;
  z-index: 100000000;
  @keyframes slide {
    0% {
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }
`;
const Popup4 = styled.div`
  position: absolute;
  top: 60%;
  left: 110%;
  color: black;
  min-width: 150px;
  animation: slide 0.2s ease-in-out forwards;
  transition: all 0.5s ease-in-out;
  background-color: white;

  @keyframes slide {
    0% {
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }
`;

const GenderPopup = () => {
  const [typePopup, showType] = useState(false);
  const [typePopup1, ShowType1] = useState(false);

  return (
    <Container>
      {Gender.map((item) => (
        <Wrapper
          onMouseEnter={
            item.gender === "Male"
              ? () => showType(true)
              : () => ShowType1(true)
          }
          onMouseLeave={
            item.gender === "Male"
              ? () => showType(false)
              : () => ShowType1(false)
          }
        >
          <Name id={item.id}>{item.gender}</Name>

          <KeyboardArrowRightIcon style={{ color: "gray", fontSize: "18px" }} />
        </Wrapper>
      ))}

      {typePopup && (
        <Popup3
          onMouseEnter={() => showType(true)}
          onMouseLeave={() => showType(false)}
        >
          <TypePopup />
        </Popup3>
      )}

      {typePopup1 && (
        <Popup4 onMouseEnter={() => ShowType1(true)}>
          <TypePopup />
        </Popup4>
      )}
    </Container>
  );
};

export default GenderPopup;
