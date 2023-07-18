import axios from "axios";
import React, { useEffect, useState, useLayoutEffect } from "react";

import styled from "styled-components";
import { ProductLists } from "../data";
import MainProduct from "./MainProduct";
import { laptop, tablet } from "../responsive";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
`;

const Wrapper = styled.div`
  display: flex;
  ${tablet({ flexDirection: "column" })};
  /* align-items: center; */
  /* justify-content: center; */
  gap: 27px;
  flex-wrap: wrap;
  margin-top: 20px;
  max-width: 100%;
  min-height: 25rem;
`;

const Box = styled.div`
  display: flex;
  ${laptop({ padding: "3px" })};
  ${tablet({ padding: "15px", maxWidth: "100%" })};
  max-width: 23%;
  height: 100%;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  ${tablet({ width: "100%" })};
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

const Currency = styled.p`
  font-family: "Inter", sans-serif;
`;

const Price = styled.h4`
  text-transform: uppercase;
  line-height: 1.5;
  /* font-family: 'Inter', sans-serif; */
  font-weight: 600;
  opacity: 0.7;
  display: flex;
`;

const RelatedComponents = () => {
  const [list, showList] = useState([]);

  const location = useLocation();

  const cat = location.pathname.split("/")[2];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/product`
        );

        showList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  console.log(list);

  return (
    <Container>
      <h2 style={{ fontSize: "26px", fontWeight: "600", Color: "#131315" }}>
        Related Products
      </h2>
      <Wrapper>
        {list?.slice(0, 4).map((item, index) => (
          <Box key={item._id}>
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
          // <MainProduct key={index} item={item} cat={cat}/>
        ))}
      </Wrapper>
    </Container>
  );
};

export default RelatedComponents;
