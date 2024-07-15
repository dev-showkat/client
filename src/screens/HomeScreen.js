import { useSelector } from "react-redux";
import { Container, Box, LinearProgress } from "@mui/material";
import LoginScreen from "./LoginScreen";
import ItemsScreen from "./ItemsScreen";

const HomeScreen = () => {
  const { userInfo, loading: userLoading } = useSelector((state) => state.user);
  const { loading: itemLoading } = useSelector((state) => state.items);
  const token = localStorage.getItem("token");

  return (
    <Container component="main">
      {(userLoading || itemLoading) && <LinearProgress color="secondary" />}
      {userInfo ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ItemsScreen />
        </Box>
      ) : (token?"":
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
