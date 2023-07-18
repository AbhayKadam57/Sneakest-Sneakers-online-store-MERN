import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCartArrowDown,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, updateProduct } from "../redux/cartSlice";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../requestMethod";
import dotenv from "dotenv";

dotenv.config();

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Title = styled.h1`
  font-weight: 600;
  margin-top: 2rem;
  font-size: 40px;
`;

const Button = styled.button`
  height: 3rem;
  font-size: 16px;
  color: white;
  background-color: #222222;
  border: none;
  padding: 15px 20px;
  border-radius: 3px;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Wrapper2 = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  gap: 8rem;
`;

const BarBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  position: relative;
`;

const ProgressBar = styled.div`
  min-width: 100%;
  height: 5px;
  background-color: #e1e1e1;
  border-radius: 2px;
  display: inline-flex;
  flex-direction: column;
  position: relative;
  border-radius: 2px;

  &::after {
    content: "";
    height: 5px;
    background-color: #3bb54a;
    min-width: 25%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 2px;
  }
`;

const Circle1 = styled.div`
  width: 30px;
  height: 30px;
  background-color: #222222;
  border-radius: 50%;
  position: absolute;
  top: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 5px solid white;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  position: absolute;
  top: 0;
  left: ${(props) => props.num === "1" && "25%"};
  left: ${(props) => props.num === "2" && "50%"};
  left: ${(props) => props.num === "3" && "75%"};
`;

const Text = styled.p`
  position: absolute;
  top: 20px;
  font-size: 14px;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  ${tablet({ fontSize: "10px" })}
`;

const CartDetails = styled.div`
  display: flex;
  gap: 30px;
  ${tablet({ flexDirection: "column" })};
`;

const Left = styled.div`
  flex: 2;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const ImageDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 2;
`;

const InputBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  max-width: 2rem;
  height: 100%;
  border: none;
  outline: none;
  justify-content: flex-end;
  background-color: #efefef;
  height: 2rem;

  &::-webkit-inner-spin-button,
  -webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &[type="input"] {
    -moz-appearance: textfield;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid #e1e1e1;
  cursor: pointer;
  height: 2rem;
  padding: 1px 5px;
`;

const ImageBox = styled.img`
  width: 3rem;
  height: auto;
`;

const Type = styled.p`
  font-size: 16px;
  color: #5a5a5a;
  font-size: 14px;
  ${tablet({ fontSize: "12px" })}
  display: flex;
`;

const Right = styled.div`
  flex: 1;
  height: auto;
`;

const Price = styled.p`
  display: flex;
  font-size: 14px;
`;

const CheckoutBox = styled.div`
  background-color: #f5f3f5;
  border: 1px solid #f6f6f6;
`;

const Level1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  color: black;
  border-bottom: 1px solid #c8c7c7;
`;

const Level2 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
  border-bottom: 1px solid #c8c7c7;
`;

const Level3 = styled.div`
  display: flex;
  padding: 20px;
  gap: 15px;
  border-bottom: 1px solid #c8c7c7;
`;
const Level4 = styled.div`
  display: flex;
  padding: 20px;
  gap: 15px;
  border-bottom: 1px solid #c8c7c7;
`;

const Level3Left = styled.div`
  flex: 1;
`;
const Level3Right = styled.div`
  flex: 1;
  display: flex;
  align-items: end;
  flex-direction: column;
  justify-content: space-between;
`;

const FreeShip = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  p {
    font-size: 14px;
    font-weight: 600;
  }
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  outline: 2px solid white;
`;

const Button1 = styled.button`
  width: 100%;
  background-color: #575757;
  border: none;
  cursor: pointer;

  h2 {
    font-size: 19px;
    font-weight: 400;
    color: white;
    padding: 10px 25px;

    border: none;
  }

  &:hover {
    background-color: #222222;
  }
`;

const Update = styled.button`
  max-width: 10rem;
  padding: 8px 8px;
  font-size: 12px;
  background-color: #d9d9d9;
  cursor: no-drop;
  align-self: end;
  border: none;

  &:hover {
    color: white;
  }
`;

const CartSection = () => {
  const { products, total, quantity } = useSelector((state) => state.cart);
  const [active, setActive] = useState(false);

  const location = useLocation();

  const id = location.pathname.split("/")[1];

  const { currentUser } = useSelector((state) => state.user);

  const username = currentUser.username;

  useEffect(() => {
    if (quantity === 0) {
      setActive(true);
    }
  }, [quantity, id]);

  const res = publicRequest.put(`/cart/${username}`, {
    products: products,
    total: total,
    quantity: quantity,
  });

  const dispatch = useDispatch();

  const [quantitys, setQuantity] = useState(0);
  const [editQuantity, setEditQuantity] = useState({
    id: "",
    status: true,
  });

  const handleClick = (id, type, newID) => {
    dispatch(updateProduct({ id, type, newID }));
  };

  const handleEditQuantity = (id) => {
    setEditQuantity({
      id,
      status: true,
    });
  };

  const handleDelete = (newID, quantity, price) => {
    dispatch(removeProduct({ newID, quantity, price }));
  };

  const handleBlur = (id, type, newID) => {
    // if(quantity===" " || quantity==='0'){

    //     setQuantity(0)
    // }
    setEditQuantity(editQuantity.status === false);

    dispatch(
      updateProduct({ id, type, quantitys: Math.floor(quantitys), newID })
    );
  };

  console.log(products);

  const amount_Total = Math.ceil(total * 1.18);

  const initiatePayment = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "snaeakest shop pvt ltd.",
      description: "Ultimate sneaker shop for Gen Z",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu92yfGDBzucbuCUnY5IwMtnUEXKgbeDuiPw&usqp=CAU",
      order_id: data.id,
      handler: async (response) => {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/product/verify`;

        const { data } = await axios.post(URL, response);

        console.log(data);
      },
      theme: {
        color: "#222",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.open();
  };

  const handleCheckout = async () => {
    const originalURL = `${process.env.REACT_APP_BACKEND_URL}/payment/order`;

    const { data } = await axios.post(originalURL, { amount: amount_Total });

    initiatePayment(data.data);
  };

  return (
    <Container>
      {active ? (
        <Wrapper>
          <FontAwesomeIcon
            icon={faCartArrowDown}
            style={{ fontSize: "15rem", color: "gray", opacity: "0.3" }}
          />
          <Title>Your cart is currently empty</Title>
          <Link style={{ textDecoration: "none" }} to="/">
            <Button>Return to Shop</Button>
          </Link>
        </Wrapper>
      ) : (
        <Wrapper2>
          <BarBox>
            <ProgressBar />
            <Box num={"1"}>
              <Circle1 num={"1"}>
                <p>1</p>
              </Circle1>
              <Text>Shopping Cart</Text>
            </Box>
            <Box num={"2"}>
              <Circle1 num={"2"}>
                <p>2</p>
              </Circle1>
              <Text>Shipping and Checkout</Text>
            </Box>
            <Box num={"3"}>
              <Circle1 num={"3"}>
                <p>3</p>
              </Circle1>
              <Text>Confirmation</Text>
            </Box>
          </BarBox>
          <CartDetails>
            <Left>
              {products?.map((item, index) => (
                <Product key={index}>
                  <ImageDetails>
                    <FontAwesomeIcon
                      icon={faClose}
                      style={{
                        Curser: "pointer",
                        color: "gray",
                        fontSize: "12px",
                      }}
                      onClick={() =>
                        handleDelete(item?.newID, item.Quantitys, item?.price)
                      }
                    />
                    <ImageBox src={item?.images[0]} />
                    <Type>
                      {item?.type} Size:{item?.chosen}
                    </Type>
                  </ImageDetails>
                  <InputBox>
                    <Input
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={
                        editQuantity.status && editQuantity.id === item?.newID
                          ? quantitys
                          : item?.Quantitys
                      }
                      onFocus={() => setQuantity(" ")}
                      onBlur={() =>
                        handleBlur(item?._id, "updateQuantity", item?.newID)
                      }
                      onClick={() => handleEditQuantity(item?.newID)}
                    />
                    <Buttons>
                      <FontAwesomeIcon
                        icon={faAngleUp}
                        style={{ fontSize: "14px", color: "gray" }}
                        onClick={() =>
                          handleClick(item?._id, "up", item?.newID)
                        }
                      />
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        style={{ fontSize: "14px", color: "gray" }}
                        onClick={() =>
                          handleClick(item?._id, "down", item?.newID)
                        }
                      />
                    </Buttons>
                  </InputBox>
                  <Price>
                    <p style={{ fontFamily: "inter" }}>₹</p>
                    {item?.price}
                  </Price>
                </Product>
              ))}
            </Left>
            <Right>
              <CheckoutBox>
                <Level1>
                  <Type>Subtotal</Type>
                  <Price>
                    <p style={{ fontFamily: "inter" }}>₹</p>
                    {total}
                  </Price>
                </Level1>
                <Level2>
                  <Type>Shipping</Type>
                  <FreeShip>
                    <Dot />
                    <p>Free Shipping</p>
                  </FreeShip>
                  <Type>
                    Shipping to <b>Maharashtra</b>
                  </Type>
                  <Type style={{ textDecoration: "underline" }}>
                    Change Address
                  </Type>
                </Level2>
                <Level3>
                  <Level3Left>
                    <Type
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Total
                    </Type>
                  </Level3Left>
                  <Level3Right>
                    <Price>
                      <p style={{ fontFamily: "inter" }}>₹</p>
                      {Math.ceil(total * 1.18)}
                    </Price>
                    <Type style={{ display: "flex" }}>
                      {" "}
                      (includes<p style={{ fontFamily: "inter" }}>₹</p>
                      {Math.ceil(total * 0.09)} 9% CGST,
                      <p style={{ fontFamily: "inter" }}>₹</p>
                      {Math.ceil(total * 0.09)} 9% SGST)
                    </Type>
                  </Level3Right>
                </Level3>
                <Level4>
                  <Type style={{ display: "flex", gap: "8px" }}>
                    Or 3 intrest free payments of{" "}
                    <b
                      style={{
                        fontFamily: "Inter",
                        display: "flex",
                        fontWeight: "bold",
                      }}
                    >
                      ₹<p>{Math.ceil((total * 1.18) / 3)}</p>
                    </b>
                    with{" "}
                    <img
                      style={{ width: "50px" }}
                      src="https://i.postimg.cc/vBdxk87h/banner-logo.png"
                    />
                  </Type>
                </Level4>
                <Button1 onClick={() => handleCheckout()}>
                  <h2>Proceed with checkout</h2>
                </Button1>
              </CheckoutBox>
            </Right>
          </CartDetails>
        </Wrapper2>
      )}
    </Container>
  );
};

export default CartSection;
