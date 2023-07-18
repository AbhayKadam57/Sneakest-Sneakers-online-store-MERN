import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

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
  margin-bottom: 20px;
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
`;

const Error = styled.small`
  color: red;
`;

const Register = () => {
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    e.preventDefault();

    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClick = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      user
    );

    console.log(res.data);
  };

  console.log(user);
  return (
    <Container>
      <h1>Register</h1>
      <Form>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <Input
          type="Password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <Button onClick={handleClick} type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already registered?click{" "}
        <Link
          to="/login"
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          here{" "}
        </Link>
        to Login{" "}
      </p>
    </Container>
  );
};

export default Register;
