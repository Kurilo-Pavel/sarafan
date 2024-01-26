import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import loginReducer from "./user/userSlice";
import componentReducer from "./component/componentSlice";
import cookieReducer from "./product/cookieSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: loginReducer,
    component: componentReducer,
    cookie: cookieReducer,
  }
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch ;
