import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NewArrival } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { laptop, tablet } from "../responsive";
import { Link } from "react-router-dom";
import axios from "axios";

const Category = styled.div``;

const Container = styled.div`
  /* overflow: hidden; */
  padding: 0px 30px;
`;

const Wrapper = styled(Slider)`
  ${laptop({ padding: "12px" })}
  align-items: center;
  padding: 0 20px;
  max-width: 100%;
`;

const Slide = styled.div`
  padding: 15px;
  outline: none;
  cursor: pointer;
  ${laptop({ padding: "3px" })};
  ${tablet({ padding: "15px" })};
  background-color: green;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  ${laptop({ width: "310px" })};
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  color: #212529;
  margin-top: 10px;
`;

const Brand = styled.p`
  text-transform: uppercase;
  font-weight: 200;
  opacity: 0.9;
  line-height: 2;
  text-decoration: none;
`;

const Desc = styled.p`
  text-transform: uppercase;
  font-weight: 600;
  max-width: 250px;
  line-height: 1.5;
`;

const Price = styled.h4`
  text-transform: uppercase;
  line-height: 1.5;
  /* font-family: 'Inter', sans-serif; */
  font-weight: 600;
  opacity: 0.7;
  display: flex;
`;

const Currency = styled.p`
  font-family: "Inter", sans-serif;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  left: ${(props) => props.direction === "left" && "-30px"};
  right: ${(props) => props.direction === "right" && "-30px"};
  z-index: 10;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 25px;
  font-weight: 200;
  opacity: 0.5;
  transition: all 0.3s ease;
  /* background-color:red; */

  &:hover {
    opacity: 1;
  }
`;

const MainTitle = styled.h2`
  padding: 10px 50px;
  opacity: 0.8;
  font-weight: 600;
  margin: 10px 0;
`;
const Box = styled.div`
  border: 12px solid white;
  ${laptop({ padding: "3px" })};
  ${tablet({ padding: "15px" })};
`;

export const Prev = ({ onClick }) => {
  return (
    <Arrow direction={"left"}>
      <FontAwesomeIcon icon={faAngleLeft} onClick={onClick} />
    </Arrow>
  );
};

export const Next = ({ onClick }) => {
  return (
    <Arrow direction={"right"}>
      <FontAwesomeIcon icon={faAngleRight} onClick={onClick} />
    </Arrow>
  );
};

const NewArrivals = () => {
  const [list, ShowList] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/product?New`
        );

        ShowList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    prevArrow: <Prev />,
    nextArrow: <Next />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Category>
      <MainTitle>NEW ARRIVALS</MainTitle>

      <Container>
        <Wrapper {...settings}>
          {list &&
            list?.slice(3, 12).map((item, index) => (
              <Box key={index}>
                <Link
                  to={`/product/${item.categories[0]}/${item._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Image src={item.images[0]} />
                  <Brand>{item.title}</Brand>
                  <Desc>{item.type}</Desc>
                  <Price>
                    <Currency>₹</Currency>
                    {item.price}
                  </Price>
                </Link>
              </Box>
            ))}
        </Wrapper>
      </Container>
    </Category>
  );
};

export default NewArrivals;
