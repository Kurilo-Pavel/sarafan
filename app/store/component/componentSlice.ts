import {createSlice} from "@reduxjs/toolkit";

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

const componentSlice = createSlice<Components>({
  name: "component",
  initialState,
  reducers: {
    setCart: (state: { cart: boolean }) => {
      state.cart = true;
    },
    setPayment: (state: { payment: boolean }) => {
      state.payment = true;
    },
    setDelivery: (state: { delivery: boolean }) => {
      state.delivery = true;
    },
    setExchange: (state: { exchange: boolean }) => {
      state.exchange = true;
    },
    resetHelp: (state: Components) => {
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
