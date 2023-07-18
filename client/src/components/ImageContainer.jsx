import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { SlideShow } from "../data";
import Magnifier from "react-magnifier";
import { tablet } from "../responsive";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: start;
  gap: 20px;
  flex: 1;
  height: auto;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
  flex: 1;
  ${tablet({ display: "none" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Menu = styled.div`
  width: 90%;
  height: 90%;
  opacity: ${(props) => (props.active ? "1" : "0.5")};
  cursor: pointer;
`;
const Right = styled.div`
  flex: 8;
  height: auto;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  transform: translateX(${(props) => props.slideNumber * -100}%);
  min-height: 100px;
  min-width: 100px;
  display: flex;
  transition: all 0.5s ease;
  background-color: red;
`;

const Slide = styled.div`
  min-width: 100%;
  min-height: auto;
  display: flex;
  flex: 1;
`;
const Images = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Arrow = styled.div`
  position: absolute;
  bottom: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  z-index: 1;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "0px"};
  width: 20px;
  height: 200px;
  font-size: 30px;
  font-weight: 400;
  padding: 0 20px;
  cursor: pointer;
  color: gray;
`;

const IconLeft = styled.div`
  animation: slide 0.1s linear;
  opacity: 1;
  transform: translateX(0%);

  &:hover {
    @keyframes slide {
      0% {
        transform: translateX(-100%);
        opacity: 1;
      }

      100% {
        transform: translateX(0%);
        opacity: 0;
      }
    }
  }
`;

const IconRight = styled.div`
  animation: slideIn 0.1s ease;
  opacity: 1;
  transform: translateX(0%);

  &:hover {
    @keyframes slideIn {
      0% {
        transform: translateX(100%);
        opacity: 1;
      }

      100% {
        transform: translateX(0%);
        opacity: 0;
      }
    }
  }
`;

const ZoomBox = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: black;
  display: flex;
  flex-direction: column;
  transition: pop 5s ease;

  @keyframes pop {
    0% {
      transform: scaleX(0);
    }
    80% {
      transform: scaleX(1);
    }

    100% {
      transform: scaleX(0);
    }
  }
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 20px;
`;

const SliderBox = styled.div`
  height: 30rem;
  width: 30rem;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 10px;
  overflow: hidden;
`;

const Wrapper1 = styled.div`
  min-width: 100%;
  min-height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideNumber * -30}rem);
`;

const Slides = styled(Magnifier)`
  min-width: 30rem;
  min-height: 30rem;
`;

// const Image1 = styled.img`

//     width:100%;

// `

const ArrowNew = styled.div`
  position: fixed;
  top: 50%;
  bottom: 50%;
  z-index: 100;
  color: white;
  left: ${(props) => props.direction === "left" && "20px"};
  right: ${(props) => props.direction === "right" && "20px"};
  font-size: 22px;
  cursor: pointer;
`;
const Number = styled.p`
  color: white;
  flex: 9;
`;

const Symbols = styled.div`
  flex: 1;
  float: right;
  display: flex;
  gap: 1rem;
  font-size: 22px;
  cursor: pointer;
  color: white;
`;

const ImageContainer = () => {
  const [ShowArrow, setShowArrow] = useState(false);

  const [SlideNumber, setSlideNumber] = useState(0);

  const [ShowSlide, setShowSlide] = useState(false);

  const [Single, setSingle] = useState([]);

  const location = useLocation();

  const path = location.pathname;

  const id = location.pathname.split("/")[3];

  const [list, setList] = useState([]);

  console.log(list);

  useEffect(() => {
    const myProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/product/find/${id}`
        );

        setSingle(res.data);
        setList(res.data.images);
      } catch (error) {
        console.log(error);
      }
    };

    myProduct();
  }, [id]);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideNumber(SlideNumber > 0 ? SlideNumber - 1 : SlideShow.length - 1);
    } else {
      setSlideNumber(SlideNumber < SlideShow.length - 1 ? SlideNumber + 1 : 0);
      console.log(SlideNumber);
    }
  };

  const getSlide = (num) => {
    setSlideNumber(num);
  };

  return (
    <Container>
      <Left>
        {list?.map((item, index) => (
          <Menu
            key={index}
            active={SlideNumber === index}
            onClick={() => getSlide(index)}
          >
            <Image src={item} />
          </Menu>
        ))}
      </Left>
      <Right>
        {ShowArrow && (
          <Arrow
            onMouseEnter={() => setShowArrow(true)}
            onMouseLeave={() => setShowArrow(false)}
            direction="left"
            onClick={() => handleClick("left")}
          >
            <IconLeft>
              <FontAwesomeIcon icon={faAngleLeft} />
            </IconLeft>
          </Arrow>
        )}

        <Wrapper
          onMouseEnter={() => setShowArrow(true)}
          onMouseLeave={() => setShowArrow(false)}
          slideNumber={SlideNumber}
          onClick={() => setShowSlide(true)}
        >
          {list?.map((item, index) => (
            <Slide key={index}>
              <Images src={item} />
            </Slide>
          ))}
        </Wrapper>

        {ShowArrow && (
          <Arrow
            onMouseEnter={() => setShowArrow(true)}
            onMouseLeave={() => setShowArrow(false)}
            direction="right"
            onClick={() => handleClick("right")}
          >
            <IconRight>
              <FontAwesomeIcon icon={faAngleRight} />
            </IconRight>
          </Arrow>
        )}
      </Right>
      {ShowSlide && (
        <ZoomBox>
          <Header>
            <Number>{SlideNumber + 1 + "/" + SlideShow.length}</Number>
            <Symbols>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setShowSlide(false)}
              />
            </Symbols>
          </Header>
          <ArrowNew direction={"left"} onClick={() => handleClick("left")}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </ArrowNew>
          <SliderBox>
            <Wrapper1 slideNumber={SlideNumber}>
              {list?.map((item, index) => (
                <Slides
                  key={index}
                  src={item}
                  width={200}
                  height={100}
                ></Slides>
              ))}
            </Wrapper1>
          </SliderBox>
          <ArrowNew direction={"right"} onClick={() => handleClick("right")}>
            <FontAwesomeIcon icon={faArrowRight} />
          </ArrowNew>
        </ZoomBox>
      )}
    </Container>
  );
};

export default ImageContainer;
