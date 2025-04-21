import { Box, Typography, AppBar, Toolbar, Avatar } from "@mui/material";
import lrLogo from "../assets/lr-logo.png";
import { useAppProvider } from "../providers/AppProvider";

export default function Header() {
  const { desktop } = useAppProvider();

  return (
    <AppBar color="transparent" elevation={0} position="static" sx={{ py: 1 }}>
      <Toolbar variant="regular" sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={lrLogo}
            variant="square"
            sx={{ width: 120, height: 64 }}
          />
        </Box>
        <Box sx={{ ml: 5 }}>
          <Typography variant="body1" component={desktop ? "span" : "div"}>
            Already have an account?{" "}
          </Typography>
          <Typography
            variant="body1"
            component={desktop ? "span" : "div"}
            color="error"
          >
            Sign in here
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
