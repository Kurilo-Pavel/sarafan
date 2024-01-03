import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {boolean} from "zod";

type Components = {
  cart: boolean;
  payment: boolean;
  delivery: boolean;
  exchange: boolean;
};

const initialState: Components = {
  cart: false,
  payment: false,
  delivery: false,
  exchange: false,
};

const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setCart: (state: { cart: boolean }) => {
      state.cart = true;
    },
    setPayment: (state: { payment: boolean }, action: PayloadAction<boolean>) => {
      state.payment = action.payload;
    },
    setDelivery: (state: { delivery: boolean }, action: PayloadAction<boolean>) => {
      state.delivery = action.payload;
    },
    setExchange: (state: { exchange: boolean }, action: PayloadAction<boolean>) => {
      state.exchange = action.payload;
    },
    resetHelp: (state: Components):void => {
      state.cart = false;
      state.delivery = false;
      state.payment = false;
      state.exchange = false;
    },
  }
});

export const {
  setCart, setPayment, setDelivery, setExchange, resetHelp
} = componentSlice.actions;
export default componentSlice.reducer;
