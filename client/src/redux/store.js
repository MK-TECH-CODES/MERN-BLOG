import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userslice";
import { combineReducers } from "@reduxjs/toolkit";
import themeslice from "./theme/themeslice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeslice,
});

// console.log(themeReducer);

const presistconfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(presistconfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
