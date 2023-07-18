import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Images } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { mobile, laptop } from "../responsive";
import axios from "axios";
import { publicRequest } from "../requestMethod";
import {
  addProduct,
  removeProduct,
  tempRemoveProduct,
  OnLoadAddPRoduct,
} from "../redux/cartSlice";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dotenv from "dotenv";

dotenv.config();

const Container = styled.div`
  display: flex;
  min-width: 100%;
  height: 80vh;
  overflow: hidden;
`;

const Wrapper = styled(Slider)`
  width: 100%;
  height: 100%;
  position: relative;

  ul li button {
    &:before {
      color: white;
      opacity: 1;
    }
  }

  ul li.slick-active button::before {
    color: black;
  }

  .slick-dots {
    position: absolute;
    bottom: 10px;
  }
`;

const ArrowBox = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  bottom: 50%;
  left: ${(props) => props.direction === "left" && "20px"};
  right: ${(props) => props.direction === "right" && "20px"};
  z-index: 1;
  color: white;
  cursor: pointer;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ display: "none" })};
`;

const Slide = styled.div`
  display: flex;
  width: 100vw;
  height: 80vh;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Prev = ({ onClick }) => {
  return (
    <ArrowBox direction={"left"} onClick={onClick}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </ArrowBox>
  );
};

const Next = ({ onClick }) => {
  return (
    <ArrowBox direction={"right"} onClick={onClick}>
      <FontAwesomeIcon icon={faAngleRight} />
    </ArrowBox>
  );
};

const Details = styled.div`
  padding: 20px;
  position: absolute;
  bottom: 10%;
  font-weight: bold;
`;

const Title = styled.h2`
  color: #ffffff;
  font-family: "Staatliches", cursive;
  font-size: 40px;
  letter-spacing: 2px;
  ${laptop({ fontSize: "22px" })}
  ${mobile({ fontSize: "20px" })}
`;

const Desc = styled.h1`
  background-color: orange;
`;

const AutoSlider = () => {
  const [Load, setLoad] = useState([]);

  const { quantity, products, total, userID } = useSelector(
    (state) => state.cart
  );
  const { currentUser } = useSelector((state) => state.user);

  console.log(`${process.env.REACT_APP_BACKEND_URL}/slider`);

  useEffect(() => {
    //     const userId = currentUser._id

    //     console.log(userId)

    const getImages = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/slider`
        );
        setLoad(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getImages();

    //     const res = await publicRequest.post(`/cart/`,{userID:userId})

    //     console.log(res.data)

    //     const products = res.data.products
    //     const quantity = res.data.quantity || 0
    //     const total = res.data.total || 0

    //     console.log(products)

    //     dispatch(OnLoadAddPRoduct({products,quantity,total,userId}))
  }, []);

  console.log(Load);

  const dispatch = useDispatch();

  window.onload = async () => {};

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <Prev />,
    nextArrow: <Next />,
  };

  return (
    <Container>
      <Wrapper {...settings}>
        {Load?.map((item, index) => (
          <Slide key={index}>
            <Image src={item.img} alt="" />
            <Details>
              <Title>{item.title}</Title>
              <Desc bg={item.bg}>{item.Desc}</Desc>
            </Details>
          </Slide>
        ))}
      </Wrapper>
    </Container>
  );
};

export default AutoSlider;
