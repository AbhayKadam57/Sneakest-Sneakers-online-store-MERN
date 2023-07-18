import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ProductLists } from "../data";
import MainProduct from "../components/MainProduct";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32.5px;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const ProductList = ({ cat, filters, sort }) => {
  const [list, showList] = useState([]);

  const [filterList, setFilterList] = useState([]);
  console.log(filterList);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          cat
            ? `${process.env.REACT_APP_BACKEND_URL}/product?category=${cat}`
            : `${process.env.REACT_APP_BACKEND_URL}/product`
        );

        showList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [cat]);

  useEffect(() => {
    filters &&
      setFilterList(
        list?.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cat, filters, list]);

  console.log(sort);

  useEffect(() => {
    if (sort === "newest") {
      setFilterList((prev) =>
        [...prev]?.sort((a, b) => a.updatedAt - b.updatedAt)
      );
    } else if (sort === "asc") {
      setFilterList((prev) => [...prev]?.sort((a, b) => a.price - b.price));
    } else {
      setFilterList((prev) => [...prev]?.sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filterList?.map((item, index) => (
            <MainProduct key={index} item={item} cat={cat} />
          ))
        : list?.map((item, index) => (
            <MainProduct key={index} item={item} cat={cat} />
          ))}
    </Container>
  );
};

export default ProductList;
