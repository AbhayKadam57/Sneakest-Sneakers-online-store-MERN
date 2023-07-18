import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Images } from "../data";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transform: translateX(${(props) => props.SlideNumber * -100}vw);
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  position: relative;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #8484844b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  bottom: 50%;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  z-index: 1;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 20px;
  left: 60px;
  color: #01161e;
`;
const Title = styled.h3`
  font-family: "Staatliches", cursive;
  font-size: 32px;
`;
const Desc = styled.h2`
  font-family: "Staatliches", cursive;
  font-size: 48px;
`;

const Slider = () => {
  const [slideNumber, setSlideNumber] = useState(0);

  console.log(slideNumber);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideNumber(slideNumber > 0 ? slideNumber - 1 : 4);
    } else {
      setSlideNumber(slideNumber < 4 ? slideNumber + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIosIcon style={{ color: "white" }} />
      </Arrow>
      <Wrapper SlideNumber={slideNumber}>
        {Images.map((item) => (
          <Slide key={item.id} color={item.bg}>
            <Image src={item.img} />
            <Info key={item.id}>
              <Title>{item.title}</Title>
              <Desc>{item.Desc}</Desc>
            </Info>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIosIcon style={{ color: "white" }} />
      </Arrow>
    </Container>
  );
};

export default Slider;
