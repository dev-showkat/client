import { useSelector } from "react-redux";
import { Container, Box, CircularProgress } from "@mui/material";
import LoginScreen from "./LoginScreen";
import ItemsScreen from "./ItemsScreen";

const HomeScreen = () => {
  const { userInfo, loading } = useSelector((state) => state.user);

  return (
    <Container component="main">
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress />
        </Box>
      ) : userInfo ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ItemsScreen />
        </Box>
      ) : (
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LoginScreen />
        </Box>
      )}
    </Container>
  );
};

export default HomeScreen;
