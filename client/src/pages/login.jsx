import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../requestMethod";
import {
  addProduct,
  removeProduct,
  tempRemoveProduct,
  OnLoadAddPRoduct,
} from "../redux/cartSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background: url("../../images/bg.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;

  h1 {
    color: #fff;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 15rem;
`;

const Input = styled.input`
  height: 2rem;
  margin-top: 20px;
  font-size: 1.1em;
`;

const Button = styled.button`
  height: 2rem;
  margin-top: 20px;
  background-color: #2046ad;
  color: white;
  border: none;

  &:disabled {
    background-color: #c4c4c4;
  }
`;

const Error = styled.small`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState();

  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const isFetching = useSelector((state) => state.isFetching);

  const error = useSelector((state) => state.error);

  console.log(error);

  console.log(isFetching);

  console.log(username);

  // const {quantity,products,total,userID} =useSelector(state=>state.cart)
  // const {currentUser}= useSelector(state=>state.user)
  // const userId = currentUser._id

  const handleClick = async (e) => {
    e.preventDefault();

    login(dispatch, { username, password });

    const res = await publicRequest.post("/cart", { username: username });

    console.log(res.data);

    const products = res.data.products;
    const quantity = res.data.quantity || 0;
    const total = res.data.total || 0;

    console.log(products);

    dispatch(OnLoadAddPRoduct({ products, quantity, total, username }));
  };

  return (
    <Container>
      <h1>Login </h1>
      <Form>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleClick}>Login</Button>
      </Form>
      {error && <Error>Wrong username or password</Error>}
      <p>
        Not registered?click{" "}
        <Link
          to="/register"
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          here
        </Link>{" "}
      </p>
    </Container>
  );
};

export default Login;
