import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {URL} from "../../constants";
import {FormValues} from "@/app/log/page";

type User ={
  user: {
    email?: string;
    token?: string;
    admin?: boolean;
  },
  message: string;
  isNewPassword: boolean;
  error: string
}

export const registration = createAsyncThunk<User, FormValues>(
  "user/registration",
  async (values: FormValues) => {
    const response = await fetch(URL + "/reg", {
      method: "POST",
      body: JSON.stringify(values)
    });
    return await response.json();
  });

export const login = createAsyncThunk<User, FormValues>
(
  "user/login",
  async (values: FormValues) => {
    const response = await fetch(URL + "/log", {
      method: "POST",
      body: JSON.stringify(values)
    });
    return await response.json();
  });

export const updatePassword = createAsyncThunk<User, string>(
  "user/updatePassword",
  async (mail) => {
    const response = await fetch(URL + "/updatePassword", {
      method: "POST",
      body: JSON.stringify({email: mail}),
    });
    return await response.json();
  });


const initialState: User = {
  user: {
    email: "",
    token: "",
    admin: false,
  },
  message: "",
  isNewPassword: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdmin: (state: { message: string }, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    resetUser: (state: { user: {} }) => {
      state.user = {
        email: "",
        token: "",
        admin: false,
      }
    },
    resetMessage: (state: { message: string }) => {
      state.message = "";
    },
    resetError: (state: { error: string }) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state: User, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.error) {
        state.error = action.payload.error;
      }
    });
    builder.addCase(login.fulfilled, (state: User, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      }
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    });
    builder.addCase(updatePassword.fulfilled, (state: User, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      } if(action.payload.error) {
        state.error= action.payload.error;
      }
    });
  }
});
export const {
  resetUser, resetMessage, resetError
} = userSlice.actions;
export default userSlice.reducer;