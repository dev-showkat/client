import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { clearAlert } from "../slices/alertSlice";

const AlertMessage = () => {
  const dispatch = useDispatch();
  const { message, severity, open } = useSelector((state) => state.alert);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearAlert());
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    }
  }, [open, dispatch]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
