import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import itemReducer from "./slices/itemSlice";
import alertReducer from "./slices/alertSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemReducer,
    alert: alertReducer,
  },
});

export default store;
