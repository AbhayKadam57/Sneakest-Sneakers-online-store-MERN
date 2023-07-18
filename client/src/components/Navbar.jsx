import React, { useEffect, useState, componentDidMount, useMemo } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Badge from "@mui/material/Badge";
import Brand from "../components/Brands";
import GenderPopup from "./GenderPopup";
import { laptop, mobile, tablet } from "../responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { publicRequest } from "../requestMethod";
import {
  addProduct,
  removeProduct,
  tempRemoveProduct,
  OnLoadAddPRoduct,
} from "../redux/cartSlice";

const Container = styled.div`
  height: 70px;
  ${tablet({ height: "59px" })}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0a0908;
  padding: 10px 20px;
`;

const Logo = styled.h2`
  color: #f8f9fa;
  letter-spacing: 1.9px;
  flex: 1;
  cursor: pointer;
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  flex: 6;
  text-align: center;
  transition: all 0.5s ease;
  ${tablet({ display: "none" })}

  /* Important Fading out siblings on hover in CSS */
    &:hover>* {
    opacity: 0.6;
  }

  &:hover > *:hover {
    opacity: 1;
  }
`;

const MenuItem = styled.li`
  color: #f8f9fa;
  list-style: none;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  ${laptop({ fontSize: "10px" })}
  ${tablet({ fontSize: "10px" })}
`;

const Popup = styled.div`
  position: absolute;
  background-color: white;
  z-index: 10000;
  top: 10.5%;
  right: 21%;
  color: black;
  min-width: 150px;
  animation: growOut 0.2s ease-in-out forwards;

  @keyframes growOut {
    0% {
      transform: scale(0);
    }
    80% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Popup1 = styled.div`
  position: absolute;
  z-index: 10000;
  top: 8.5%;
  right: 57%;
  color: black;
  min-width: 150px;
  animation: growOut 0.2s ease-in-out forwards;

  @keyframes growOut {
    0% {
      transform: scale(0);
    }
    80% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const CheckoutItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex: 1;
  cursor: pointer;
`;

const Icon = styled.div`
  color: #f8f9fa;
  position: relative;
`;

const CartBox = styled.div`
  display: inline;
`;
const Icons = styled.div`
  color: white;
  flex: 1;
  font-size: 30px;
  display: none;
  ${tablet({ display: "block" })};
  ${mobile({ display: "block" })}
`;

const Logout = styled.div`
  position: absolute;
  color: white;
  top: 30px;
  right: -10px;
  z-index: 10;
  background-color: #222222;
  padding: 10px 20px;
  border-radius: 8px;
`;

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [popup, setPopup] = useState(false);
  const [genderPopup, showGenderPopup] = useState(false);
  const [Logoutbutton, Showlogout] = useState(false);
  const [dbProduct, SetDbProduct] = useState();

  const { quantity, products, total, userID } = useSelector(
    (state) => state.cart
  );
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loadeds, setLoadeds] = useState(false);

  // componentDidMount=()=>{

  //     console.log("hello")
  // }

  // useEffect(()=>{

  //     hello()

  // },[])

  const hello = async () => {
    const userId = currentUser._id;

    const res = await publicRequest.post(`/cart/`, { userID: userId });

    const products = res.data.products;
    const quantity = res.data.quantity || 0;
    const total = res.data.total || 0;

    dispatch(OnLoadAddPRoduct({ products, quantity, total, userId }));
  };

  // const zebra = setInterval(hello,1000)

  // setTimeout(()=>clearInterval(zebra),1000)

  const [loaded, setLoaded] = useState(false);

  // window.addEventListener('load', async()=>{

  //     setLoaded(true)
  //     const userId = currentUser._id

  //     console.log(loaded)

  //     const res = await publicRequest.post(`/cart/`,{userID:userId})

  //     console.log(res.data)

  //     const products = res.data.products
  //     const quantity = res.data.quantity || 0
  //     const total = res.data.total || 0

  //     console.log(products)

  //     loaded && dispatch(OnLoadAddPRoduct({products,quantity,total,userId}))

  // })

  const handleClick = async () => {
    logout(dispatch);

    navigate("/login");

    const res = await publicRequest.put(`/cart/${userID}`, {
      products: products,
      total: total,
      quantity: quantity,
    });

    dispatch(tempRemoveProduct());
  };

  return (
    <Container>
      <Wrapper>
        <Icons>
          <FontAwesomeIcon icon={faBars} />
        </Icons>

        <Link style={{ textDecoration: "none" }} to="/">
          <Logo>SNEAKEST</Logo>
        </Link>

        <Menu>
          <MenuItem>NEW ARRIVALS</MenuItem>
          <MenuItem onMouseEnter={() => showGenderPopup(true)}>
            FOOTWEAR
          </MenuItem>
          <MenuItem>APPAREL</MenuItem>
          <MenuItem>ACCESSORIES</MenuItem>
          <MenuItem>THE BASEMENT</MenuItem>
          <MenuItem onMouseEnter={() => setPopup(true)}>BRANDS</MenuItem>
          <MenuItem>HEAT</MenuItem>
          <MenuItem>SALE</MenuItem>
        </Menu>
        <CheckoutItem>
          <Icon>
            <SearchOutlinedIcon />
          </Icon>
          <Icon>
            <PermIdentityOutlinedIcon onMouseEnter={() => Showlogout(true)} />

            {Logoutbutton && (
              <Logout
                onMouseLeave={() => Showlogout(false)}
                onClick={handleClick}
              >
                <p>LOGOUT</p>
              </Logout>
            )}
          </Icon>
          <Link to={`/${userId}/cart`}>
            <CartBox>
              {show ? (
                <Badge badgeContent={quantity} color="primary">
                  <LocalMallOutlinedIcon
                    style={{ color: "white", fontSize: "30px" }}
                    onMouseEnter={() => setShow(false)}
                  />
                </Badge>
              ) : (
                <Badge badgeContent={quantity} color="primary">
                  <LocalMallIcon
                    style={{ color: "white", fontSize: "30px" }}
                    onMouseLeave={() => setShow(true)}
                  />
                </Badge>
              )}
            </CartBox>
          </Link>
        </CheckoutItem>
      </Wrapper>
      {popup && (
        <Popup onMouseLeave={() => setPopup(false)}>
          <Brand />
        </Popup>
      )}
      {genderPopup && (
        <Popup1 onMouseLeave={() => showGenderPopup(false)}>
          <GenderPopup />
        </Popup1>
      )}
    </Container>
  );
};

export default Navbar;
