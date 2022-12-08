import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "/features/theme-slice";
import authReducer from "/features/auth-slice";
import cartReducer from "/features/cart-slice";
import walletReducer from "/features/wallet-slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  cart: cartReducer,
  wallet: walletReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// store.subscribe(() => {
//   window !== "undefined" &&
//     localStorage.setItem("reduxState", JSON.stringify(store.getState()));
// });
export let persistor = persistStore(store);
