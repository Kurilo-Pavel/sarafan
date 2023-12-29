import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import loginReducer from "./user/userSlice";
import componentReducer from "./component/componentSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    login: loginReducer,
    component: componentReducer,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;