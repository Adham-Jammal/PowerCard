import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

const user = {
  id: undefined,
  phone: undefined,
  name: undefined,
  name_en: undefined,
  email: undefined,
  country_code: undefined,
  image_url: null,
  membership: {
    name: "",
    wallet: 0,
  },
};
const initialState = {
  value: user,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      // setToken(action.payload.access_token);
      setCookie("AUTH", action.payload.access_token, {
        maxAge: 60 * 60 * 9999999999999999,
      });
      state.value = { ...action.payload.user, id: action.payload.user.email };
    },
    logOut: (state) => {
      sessionStorage.clear();
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      state.value = {
        phone: undefined,
        name: undefined,
        name_en: undefined,
        email: undefined,
        country_code: undefined,
        image_url: null,
        id: undefined,
        membership: {
          name: "",
          wallet: 0,
        },
      };
      window.location.reload();
    },
  },
});

export const { setCurrentUser, logOut } = authSlice.actions;

export default authSlice.reducer;
