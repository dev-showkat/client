import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "./slices/userSlice";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ItemsScreen from "./screens/ItemsScreen";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import NavBar from "./components/NavBar";
import AlertMessage from "./components/AlertMessage";

const theme = createTheme();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AlertMessage />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/items" element={<ItemsScreen />} />
          </Route>
          <Route path="*" element={<HomeScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
