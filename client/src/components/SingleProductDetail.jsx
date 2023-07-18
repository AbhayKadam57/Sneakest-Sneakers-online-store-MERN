import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faArrowRightLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { tablet } from "../responsive";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  flex: 1;
  padding: 0px;
  margin-left: 50px;
  ${tablet({ marginLeft: "0px" })}
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Brand = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const Type = styled.p`
  font-size: 32px;
  font-weight: 400;

  color: #222222;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: 400;
  display: flex;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-top: 30px;
  max-width: 500px;
  ${tablet({ maxWidth: "100%" })}
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const DetailText = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

const Sizes = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SizeTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #222222;
`;

const SizesBox = styled.button`
  border: 1px solid #747474;
  padding: 4px 10px;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
  outline: ${(props) => props.active && "3px solid #222222"};

  &:hover {
    outline: 3px solid #222222;
  }
`;

const Clear = styled.p`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.5s ease;
`;

const Stock = styled.p`
  font-size: 14px;
  color: ${(props) => (props.active ? "green" : "red")};
  margin-top: 10px;
  transition: all 0.5s ease;
`;

const Offers = styled.p`
  font-size: 14px;
  color: #7b7b7b;
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CartBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  max-width: 30rem;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #7b7b7b;
  flex: 0.1;
`;

const QuantityText = styled.p`
  padding: 12px;
  max-width: 2rem;
`;

const QuantityButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-direction: column;
  max-width: 3rem;
  cursor: pointer;
  padding: 5px;
`;

const Button = styled(Link)`
  flex: 10;
  padding: 10px 15px;
  text-decoration: none;
  font-size: 18px;
  color: white;
  background-color: #d8d6d6;
  border: none;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => props.active && "#222222"};

  &:hover {
    background-color: ${(props) => props.active && "#222222"};
  }
`;

const SizeBoxes = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Currency = styled.small`
  font-family: "Inter";
`;

const Popup = styled.div`
  position: absolute;
  background-color: #0000004c;
  top: 0;
  left: 0;
  z-index: 10;
  color: #000000;
  width: 100%;
  height: 200%;
  display: flex;
  justify-content: center;
`;

const PopupBox = styled.div`
  position: fixed;
  min-width: 30rem;
  height: auto;
  background-color: white;
  margin: 200px auto auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  animation: Slidein 0.1s linear;

  @keyframes Slidein {
    0% {
      transform: translateY(-200%);
    }
    20% {
      transform: translateY(-180%);
    }
    40% {
      transform: translateY(-160%);
    }
    60% {
      transform: translateY(-140%);
    }
    80% {
      transform: translateY(-120%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`;

const ProductTitles = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
  color: #121111;
`;

const ProductTypes = styled.p`
  font-size: 16px;
  padding: 10px;
  border-top: 1px solid #6a6a6a;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #353535;
`;

const SingleProductDetail = () => {
  const [display, setDisplay] = useState(false);

  const [Quantitys, setQuantity] = useState(1);

  const [ShowPopup, setShowPopup] = useState(false);

  const [Single, setSingle] = useState([]);

  const [Size, SetSize] = useState([]);

  console.log(Size);

  const location = useLocation();

  const path = location.pathname;

  const id = location.pathname.split("/")[3];

  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  const [newID, setNewID] = useState();

  const { currentUser } = useSelector((state) => state.user);

  const username = currentUser.username;

  const userID = currentUser._id;

  console.log(userID);

  const { quantity, total, products } = useSelector((state) => state.cart);

  const handleClick = () => {
    const res = publicRequest.put(`/cart/${username}`, {
      username: username,
      products: products,
      quantity: quantity,
      total: total,
    });

    console.log(res.data);

    dispatch(addProduct({ ...Single, chosen, Quantitys, newID, username }));
  };

  const getNewId = async (id, chosen) => {
    setNewID(id + chosen);
  };

  useEffect(() => {
    getNewId(id, chosen);
  });

  useEffect(() => {
    const myProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/product/find/${id}`
        );

        setSingle(res.data);
        setList(Single.images);
        SetSize(res.data.sizes.filter((size) => size !== "all"));
      } catch (error) {
        console.log(error);
      }
    };

    myProduct();
  }, []);

  const [chosen, SetChosen] = useState();

  const handleChange = (action) => {
    if (action === "Add") {
      setQuantity(Quantitys < 10 ? Quantitys + 1 : Quantitys);
    } else {
      setQuantity(Quantitys > 0 ? Quantitys - 1 : Quantitys);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Brand>{Single?.title}</Brand>
        <Type>{Single?.type}</Type>
        <Price>
          <Currency>₹</Currency>
          {Single?.price}
        </Price>
        <Description>{Single?.desc}</Description>
        <ProductDetails>
          <DetailText onClick={() => setShowPopup(true)}>
            Product Details
          </DetailText>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </ProductDetails>
        <Sizes>
          <SizeTitle>Show Size(UK)</SizeTitle>
          <SizeBoxes>
            {Size.map((item, index) => (
              <SizesBox
                disabled={Single?.inStock === true ? false : true}
                key={index}
                onClick={() => SetChosen(item) || setDisplay(true)}
                active={item === chosen}
              >
                {item}
              </SizesBox>
            ))}
          </SizeBoxes>
          {display && <Clear onClick={() => setDisplay(false)}>Clear</Clear>}
        </Sizes>
        {display ||
          (Single?.inStock && (
            <div
              style={{
                height: "1px",
                backgroundColor: "#dedede",
                maxWidth: "500px",
              }}
            ></div>
          ))}
        {
          <Stock active={Single?.inStock}>
            {Single?.inStock ? "In Stock" : "Out of Stock"}
          </Stock>
        }
        <Offers>
          Or 3 interest free payments of{" "}
          <b style={{ color: "#222222", display: "flex" }}>
            {" "}
            <Currency>₹</Currency>2,890
          </b>{" "}
          with Slice
        </Offers>
        <CartBox>
          <Quantity>
            <QuantityText>{display === false ? 0 : Quantitys}</QuantityText>
            <QuantityButtons>
              <FontAwesomeIcon
                icon={faAngleUp}
                onClick={() => {
                  display && handleChange("Add");
                }}
              />
              <FontAwesomeIcon
                icon={faAngleDown}
                onClick={() => {
                  display && handleChange("Remove");
                }}
              />
            </QuantityButtons>
          </Quantity>

          <Button onClick={handleClick} active={display} to={`/${id}/cart`}>
            Add to cart
          </Button>
        </CartBox>
      </Wrapper>
      {ShowPopup && (
        <Popup>
          <PopupBox>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ProductTitles>PRODUCT DETAILS</ProductTitles>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setShowPopup(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <ProductTypes>
              Manufacturers:
              <p style={{ fontSize: "14px" }}>{Single?.manufacturers}</p>
            </ProductTypes>
            <ProductTypes>
              Country Origin:
              <p style={{ fontSize: "14px" }}>{Single?.country}</p>
            </ProductTypes>
            <ProductTypes>
              Imported By:<p style={{ fontSize: "14px" }}>{Single?.importBy}</p>
            </ProductTypes>
            <ProductTypes>
              Item weight:<p style={{ fontSize: "14px" }}>{Single?.weight}KG</p>
            </ProductTypes>
            <ProductTypes>
              Generic Name:
              <p style={{ fontSize: "14px" }}>{Single?.genericName}</p>
            </ProductTypes>
            <ProductTypes>
              Unit of Measurement:
              <p style={{ fontSize: "14px" }}>{Single?.UOM}</p>
            </ProductTypes>
            <ProductTypes>
              Marketed By:
              <p style={{ fontSize: "14px" }}>{Single?.manufacturers}</p>
            </ProductTypes>
            <ProductTypes>
              Article Code:
              <p style={{ fontSize: "14px" }}>{Single?.articleCode}</p>
            </ProductTypes>
          </PopupBox>
        </Popup>
      )}
    </Container>
  );
};

export default SingleProductDetail;
