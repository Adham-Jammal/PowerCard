import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    amount: 0,
  },
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      state.value.amount = action.payload.amount;
    },
    clearAmount: (state, action) => {
      state.value.amount = 0;
    },
  },
});

export const { setAmount, clearAmount } = walletSlice.actions;

export default walletSlice.reducer;
