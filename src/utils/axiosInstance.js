import axios from "axios";
import store from "../store";
import { logout } from "../slices/userSlice";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
    }
    const err =
      error?.response?.data?.message ||
      error?.response?.data?.errors[0]?.message ||
      error?.message || "Something went wrong"
    return Promise.reject(err);
  }
);

export default axiosInstance;
