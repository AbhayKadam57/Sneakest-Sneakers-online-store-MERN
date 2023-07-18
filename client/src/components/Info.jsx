import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  border-top: 1px solid #dee2e6;
  margin-top: 50px;
`;

const Box = styled.div`
  display: flex;
  margin: 0px 40px;
  margin-top: 30px;
  margin-bottom: 10px;
  ${mobile({ flexDirection: "column", gap: "30px" })}
`;

const Shipping = styled.div`
  display: flex;
  flex: 1;
`;

const Checkout = styled.div`
  display: flex;
  flex: 1;
`;

const Icon = styled.div`
  margin-right: 20px;
  color: black;
  opacity: 0.5;
`;
const Details = styled.div``;

const Title = styled.h4`
  font-weight: 600;
  margin-bottom: 3px;
  font-size: 14px;
`;
const Desc = styled.p`
  font-size: 14px;
  opacity: 0.7;
`;

function Info() {
  return (
    <Container>
      <Box>
        <Shipping>
          <Icon>
            <FontAwesomeIcon icon={faMap} />
          </Icon>
          <Details>
            <Title>India-wide Shipping</Title>
            <Desc>Average time: 4-6 days</Desc>
          </Details>
        </Shipping>
        <Checkout>
          <Icon>
            <FontAwesomeIcon icon={faLock} />
          </Icon>
          <Details>
            <Title>100% Secure Checkout</Title>
            <Desc>UPI/Debit Card/Credit Card/Net Banking</Desc>
          </Details>
        </Checkout>
      </Box>
    </Container>
  );
}

export default Info;
