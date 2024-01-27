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

const componentSlice = createSlice<Components,{},string>({
  name: "component",
  initialState,
  reducers: {
    setSection: (state: { section: { title: string, path: string } }, action: PayloadAction<{ title: string, path: string }>): void => {
      state.section = action.payload;
    },
    setModalSuccess: (state: { modalSuccess: string }, action: PayloadAction<string>) => {
      state.modalSuccess = action.payload;
    },
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
    resetHelp: (state: Components): void => {
      state.cart = false;
      state.delivery = false;
      state.payment = false;
      state.exchange = false;
    },
    setModal: (state: { modal: boolean; typeModal: string }, action: PayloadAction<{ modal: boolean; typeModal: string }>) => {
      state.modal = action.payload.modal;
      state.typeModal = action.payload.typeModal;
    },
    setModalTitle: (state: { titleModal: string }, action: PayloadAction<string>) => {
      state.titleModal = action.payload;
    },
    setModalOption: (state: { modalOption: string }, action: PayloadAction<string>) => {
      state.modalOption = action.payload;
    },
    setUserInform: (state: { userInform: boolean }, action: PayloadAction<boolean>) => {
      state.userInform = action.payload;
    }
  }
});

export const {
  setSection,
  setModalSuccess,
  setCart,
  setPayment,
  setDelivery,
  setExchange,
  resetHelp,
  setModal,
  setModalOption,
  setModalTitle,
  setUserInform
} = componentSlice.actions;
export default componentSlice.reducer;
