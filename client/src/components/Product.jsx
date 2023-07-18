import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import ProductList from "./ProductList";

const Container = styled.div`
  margin: 30px 40px;
  display: flex;
  flex-direction: column;
`;

const Filter = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-between;
`;

const FilterMenu = styled.select`
  width: 120px;
  padding: 5px 10px;
  font-size: 14px;
  align: right;
  margin-top: 20px;
`;
const FilterOption = styled.option`
  font-size: 14px;
`;

const Product = () => {
  const size = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, "all", "XS", "S", "M"];

  const [filters, SetFilters] = useState({});

  const [sort, SetSort] = useState("");

  const location = useLocation();

  console.log(location);

  const cat = location.pathname.split("/")[2];

  const path = location.pathname;

  console.log(cat);

  const handleChange = (e) => {
    SetFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  console.log(sort);

  console.log(filters);

  return (
    <Container>
      <h3 style={{ textTransform: "uppercase", marginBottom: "20px" }}>
        <Link to="/" style={{ color: "black" }}>
          home
        </Link>
        {path}
      </h3>
      <Filter>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <b>Sort by Arrival</b>
          <FilterMenu onChange={(e) => SetSort(e.target.value)}>
            <FilterOption defaultValue value="Select">
              Select
            </FilterOption>
            <FilterOption value="newest">Newest</FilterOption>
            <FilterOption value="asc">Price(Asc)</FilterOption>
            <FilterOption value="desc">Price(Desc)</FilterOption>
          </FilterMenu>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <b>Sort by Size</b>
          <FilterMenu name="sizes" onChange={handleChange}>
            <FilterOption defaultValue>Select</FilterOption>
            {size.map((item) => (
              <FilterOption value={item}>{item}</FilterOption>
            ))}
          </FilterMenu>
        </div>
      </Filter>

      <ProductList filters={filters} sort={sort} cat={cat} />
    </Container>
  );
};

export default Product;
