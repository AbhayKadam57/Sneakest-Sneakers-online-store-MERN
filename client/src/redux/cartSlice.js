import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    quantity: 0,
    products: [],
    total: 0,
    username: null,
  },
  reducers: {
    addProduct: (state, action) => {
      const newID = action.payload.newID;

      const index = state.products.findIndex(
        (p) => p.newID === action.payload.newID
      );

      console.log(index);

      if (index >= 0) {
        state.products[index].Quantitys += action.payload.Quantitys;
      } else {
        const tempProduct = { ...action.payload };

        state.products.push(tempProduct);
        state.quantity += 1;
      }
      state.username = action.payload.username;

      state.total += action.payload.price * action.payload.Quantitys;
    },
    removeProduct: (state, action) => {
      const newID = action.payload.newID;

      const index = state.products.findIndex((p) => p.newID === newID);

      state.quantity -= 1;
      state.products.splice(index, 1);

      state.total -= action.payload.quantity * action.payload.price;
    },
    updateProduct: (state, action) => {
      if (action.payload.quantity <= 0) {
        action.payload.quantity = 1;
      }

      const id = action.payload.id;
      const newID = action.payload.newID;
      const type = action.payload.type;
      const index = state.products.findIndex((p) => p.newID === newID);

      const currentProduct = state.products[index];

      if (type === "up" && currentProduct.newID === newID) {
        currentProduct.Quantitys += 1;
        state.total += currentProduct.price;
      }
      if (
        type === "down" &&
        currentProduct.Quantitys > 0 &&
        currentProduct.newID === newID
      ) {
        currentProduct.Quantitys -= 1;
        state.total -= currentProduct.price;
      }

      if (type === "updateQuantity" && currentProduct.newID === newID) {
        if (currentProduct.Quantitys > action.payload.quantitys) {
          state.total -=
            (currentProduct.Quantitys - action.payload.quantitys) *
            currentProduct.price;
        } else {
          state.total +=
            (action.payload.quantitys - currentProduct.Quantitys) *
            currentProduct.price;
        }

        currentProduct.Quantitys = action.payload.quantitys;
      }
    },
    tempRemoveProduct: (state, action) => {
      state.quantity = 0;
      state.products.splice(0, state.products.length);
      state.total = 0;
      state.username = null;
    },
    OnLoadAddPRoduct: (state, action) => {
      console.log(action.payload.userId);
      state.username = action.payload.username;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
      action.payload.products.map((item) => state.products.push(item));
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  tempRemoveProduct,
  OnLoadAddPRoduct,
} = cartSlice.actions;

export default cartSlice.reducer;
