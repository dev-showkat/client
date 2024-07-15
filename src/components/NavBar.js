import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../slices/userSlice";
import AppBar from "@mui/material/AppBar";
import { Box, Toolbar, Typography, Button, Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function NavBar() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Techies Infotech
          </Typography>
          {userInfo ? (
            <>
              <Grid item>
                <Typography variant="h6" sx={{ flexGrow: 1, cursor: "text" }}>
                  {userInfo.username}
                </Typography>
              </Grid>
              <LogoutIcon
                sx={{ mx: 1, cursor: "pointer" }}
                fontSize="small"
                onClick={() => dispatch(logout())}
              />
            </>
          ) : (
            <>
              {location.pathname === "/login" || location.pathname === "/" ? (
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
              ) : (
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
