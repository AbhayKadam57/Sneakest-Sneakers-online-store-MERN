import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  max-height: 400px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 20px;
  opacity: 1;

  &:hover {
    animation: pop 0.6s ease;

    @keyframes pop {
      0% {
        transform: scale(1.1);
      }
      80% {
        transform: scale(1);
      }
      100% {
        transform: scaleX(1);
      }
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
`;
const Update = styled.small`
  font-size: 12px;
  color: green;
`;

const Brand = styled.p`
  font-size: 14px;
  color: black;
  opacity: 0.7;
  font-weight: 400;
  color: black;
`;

const Type = styled.p`
  font-size: 16px;
  color: black;
  font-weight: 600;
  text-transform: uppercase;
`;

const Price = styled.p`
  font-size: 15px;
  color: black;
  font-weight: 400;
  display: flex;

  p {
    font-family: "Inter";
  }
`;

const MainProduct = ({ item, cat }) => {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <Link
        to={`/product/${cat}/${item._id}`}
        style={{ textDecoration: "none" }}
      >
        <ImageContainer
          show={show}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {show ? (
            <Image src={item.images[1]} />
          ) : (
            <Image src={item.images[0]} />
          )}
        </ImageContainer>
        <Details>
          <Update>New Arrival</Update>
          <Brand>{item.title}</Brand>
          <Type>{item.type}</Type>
          <Price>
            <p>₹</p>
            {item.price}
          </Price>
        </Details>
      </Link>
    </Container>
  );
};

export default MainProduct;
