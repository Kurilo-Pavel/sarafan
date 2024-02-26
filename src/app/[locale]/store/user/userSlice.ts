import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {URL} from "@/src/app/[locale]/constants.mjs";
import {FormValues} from "@/src/app/[locale]/log/Login";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  token: string;
  admin: boolean;
}

type DataUser = {
  user: User,
  message: string;
  isNewPassword: boolean;
  error: string
}

export const registration = createAsyncThunk<DataUser, FormValues>(
  "user/registration",
  async (values: FormValues) => {
    const response = await fetch(URL + "/reg", {
      method: "POST",
      body: JSON.stringify(values)
    });
    return await response.json();
  });

export const login = createAsyncThunk<DataUser, FormValues>
(
  "user/login",
  async (values: FormValues) => {
    const response = await fetch(URL + "/log", {
      method: "POST",
      body: JSON.stringify(values)
    });
    return await response.json();
  });

export const updatePassword = createAsyncThunk<DataUser, string>(
  "user/updatePassword",
  async (mail) => {
    const response = await fetch(URL + "/updatePassword", {
      method: "POST",
      body: JSON.stringify({email: mail}),
    });
    return await response.json();
  });

export const saveUsersData = createAsyncThunk<DataUser, {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  id:string;
}>(
  "user/saveUsersData",
  async (data) => {
    const response = await fetch(URL + "/saveUsersData", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await response.json();
  });

export const changedPassword = createAsyncThunk<DataUser, { email: string, oldPassword: string; newPassword: string }>(
  "user/changedPassword",
  async (data) => {
    const response = await fetch(URL + "/changedPassword", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await response.json();
  });

const initialState: DataUser = {
  user: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
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
    setUserData: (state: { user: User }, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetUser: (state: { user: {} }) => {
      state.user = {
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
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
    builder.addCase(registration.fulfilled, (state: DataUser, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.error) {
        state.error = action.payload.error;
      }
    });
    builder.addCase(login.fulfilled, (state: DataUser, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      }
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.user) {
        state.user.token = action.payload.user.token;
      }
    });
    builder.addCase(updatePassword.fulfilled, (state: DataUser, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.error) {
        state.error = action.payload.error;
      }
    });
    builder.addCase(saveUsersData.fulfilled, (state: DataUser, action) => {
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      if (action.payload.error) {
        state.error = action.payload.error;
      }
    });
    builder.addCase(changedPassword.fulfilled, (state: DataUser, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.error) {
        state.error = action.payload.error;
      }
    });
  }
});
export const {
  resetUser, resetMessage, resetError, setUserData
} = userSlice.actions;
export default userSlice.reducer;