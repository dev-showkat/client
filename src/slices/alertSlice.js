import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  severity: "",
  open: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    clearAlert: (state) => {
      state.message = "";
      state.severity = "";
      state.open = false;
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
