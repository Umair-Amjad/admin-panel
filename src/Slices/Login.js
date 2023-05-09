// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loading: false,
//   userInfo: {}, // for user object
//   userToken: null, // for storing the JWT
//   error: null,
//   success: false, // for monitoring the registration process.
// };

// const Login = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: {
   
//   },
// });

// export default Login.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../Services/authService";
import axios from "axios";
import { Navigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      console.log(error)
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    console.log(email, password);
    // try {
      // const data = await AuthService.login(email, password);
      // const data = await AuthService.login(email, password);
   await axios
    .post(`http://localhost:5001/login`, {
      email,
      password,
    })
    .then((response) => {
      console.log(response)
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("accessToken", JSON.stringify(response.data.token));
      }
      //  window.location.href="/table";
            //  <Navigate to="/table"/>
      return {user:response.data};
    });
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  console.log("logout")
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;