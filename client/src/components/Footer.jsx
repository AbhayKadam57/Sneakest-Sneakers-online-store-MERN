import React from "react";
import styled from "styled-components";
import { mobile, tablet, laptop } from "../responsive";

const Container = styled.div`
  background-color: #111111;
  display: flex;
  margin-top: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 50px 40px;
  width: 100%;
  ${tablet({ flexDirection: "column", gap: "30px" })}
`;

const Box1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

const List = styled.ul`
  color: white;
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;
const Item = styled.li``;

const Text = styled.p`
  color: gray;
  font-size: 14px;
  line-height: 26px;
  margin-bottom: 5px;
  font-weight: 400;
  position: relative;
  cursor: pointer;
  display: inline-block;

  &:hover {
    color: white;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: white;
    height: 1px;
    transform: scale(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-in-out;
    background-color: white;
  }

  &:hover:after {
    transform: scale(1);
    transform-origin: bottom left;
  }
`;

const Title = styled.small`
  color: white;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  line-height: 21px;
  letter-spacing: 1px;
`;

const Input = styled.input`
  height: 40px;
  outline: none;
`;
const Button = styled.button`
  margin: 0;
  background-color: black;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
`;

const Credits = styled.small`
  margin-top: 60px;
  ${mobile({ display: "none" })}
  ${laptop({ display: "none" })}
`;

const CreditsNew = styled.small`
  display: none;
  color: white;
  ${laptop({ display: "block" })}
  ${mobile({ display: "block" })}
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Box1>
          <Title>Important Links</Title>
          <List>
            <Item>
              <Text>Refund/Cancellation</Text>
            </Item>
            <Item>
              <Text>Term and Condition</Text>
            </Item>
            <Item>
              <Text>FAQ</Text>
            </Item>
            <Item>
              <Text>Privacy Policy</Text>
            </Item>
            <Item>
              <Text>Shipping</Text>
            </Item>
            <Credits>&copy; 2022 SneakestStore.com</Credits>
          </List>
        </Box1>
        <Box1>
          <Title>Need Help?</Title>
          <List>
            <Item>
              <Text>My Account</Text>
            </Item>
            <Item>
              <Text>Size Chart</Text>
            </Item>
            <Item>
              <Text>Contact Us</Text>
            </Item>
          </List>
        </Box1>
        <Box1>
          <Title>Follow</Title>
          <List>
            <Item>
              <Text>Instagram</Text>
            </Item>
            <Item>
              <Text>Facebook</Text>
            </Item>
          </List>
        </Box1>
        <Box1>
          <Title>Subscribe to our newsletter</Title>
          <List>
            <Item>Join our mailing list to receive the latest News</Item>
          </List>

          <Input type="text" placeholder="Email address" />
          <Button type="submit">Subscribe</Button>
          <CreditsNew>&copy; 2022 SneakestStore.com</CreditsNew>
        </Box1>
      </Wrapper>
    </Container>
  );
};

export default Footer;
