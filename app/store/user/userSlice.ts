import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {URL} from "../../constants";
import productSlice from "@/app/store/product/productSlice";

export const registration = createAsyncThunk(
  "user/registration",
  async (values: { email: string, password: string, repPassword: string, rules: boolean }) => {
    const response = await fetch(URL + "/reg", {
      method: "POST",
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return {error: response.status};
    }
  });

export const login = createAsyncThunk(
  "user/login",
  async (values: { email: string, password: string }) => {
    const response = await fetch(URL + "/log", {
      method: "POST",
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return {error: data};
    }
  });

type User = {
  user: {
    email?: string;
    token?: string;
    admin?: boolean;
    error?: string;
  },
  message: string;
}

const initialState: User = {
  user: {
    email: "",
    token: "",
    admin: false,
    error: "",
  },
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdmin: (state: { message:string }, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state:{message:string}, action:any) => {
        state.message = action.payload;
    });
    builder.addCase(login.fulfilled, (state:{user:{email?: string, token?: string, admin?: boolean, error?: string}}, action:any) => {
      state.user = action.payload;
    });
  }
});
export const {
  setAdmin
} = userSlice.actions;
export default userSlice.reducer;