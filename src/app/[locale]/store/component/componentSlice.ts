import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type Components = {
  modalSuccess: string;
  cart: boolean;
  payment: boolean;
  delivery: boolean;
  exchange: boolean;
  modal: boolean;
  typeModal: string;
  titleModal: string;
  modalOption: string;
  section: { title: string, path: string };
  userInform: boolean;
};

const initialState: Components = {
  modalSuccess: "",
  cart: false,
  payment: false,
  delivery: false,
  exchange: false,
  modal: false,
  typeModal: "",
  titleModal: "",
  modalOption: "",
  section: {title: "", path: ""},
  userInform: true,
};

const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setSection: (state: { section: { title: string, path: string } }, action: PayloadAction<{ title: string, path: string }>): void => {
      state.section = action.payload;
    },
    setModalSuccess: (state: { modalSuccess: string }, action: PayloadAction<string>) => {
      state.modalSuccess = action.payload;
    },
    setCart: (state: { cart: boolean }, action: PayloadAction<boolean>) => {
      state.cart = action.payload;
    },
    setHelp: (state: { payment: boolean, delivery: boolean, exchange: boolean }, action: PayloadAction<string|undefined>) => {
      if (action.payload === "payment") {
        console.log(1)
        state.payment = true;
      } else if (action.payload === "delivery") {
        console.log(2)

        state.delivery = true;
      } else if (action.payload === "exchange") {
        console.log(3)

        state.exchange = true;
      }
    },
    // setDelivery: (state: { delivery: boolean }, action: PayloadAction<boolean>) => {
    //   state.delivery = action.payload;
    // },
    // setExchange: (state: { exchange: boolean }, action: PayloadAction<boolean>) => {
    //   state.exchange = action.payload;
    // },
    resetHelp: (state: { cart: boolean, delivery: boolean, payment: boolean, exchange: boolean },
                action: PayloadAction<{ cart: boolean, delivery: boolean, payment: boolean, exchange: boolean }>): void => {
      state.cart = action.payload.cart;
      state.delivery = action.payload.delivery;
      state.payment = action.payload.payment;
      state.exchange = action.payload.exchange;
    },
    setModal: (state: { modal: boolean; typeModal: string }, action: PayloadAction<{ modal: boolean; typeModal: string }>) => {
      state.modal = action.payload.modal;
      state.typeModal = action.payload.typeModal;
    },
    setUserInform: (state: { userInform: boolean }, action: PayloadAction<boolean>) => {
      state.userInform = action.payload;
    }
  }
});

export const {
  setSection,
  setCart,
  setHelp,
  resetHelp,
  setUserInform
} = componentSlice.actions;
export default componentSlice.reducer;
