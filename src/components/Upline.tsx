import {
  Stack,
  Box,
  Typography,
  ListItem,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { useAppProvider } from "../providers/AppProvider";

interface Upline {
  id: number | null;
  name: string;
  email: string;
  phone: string;
}

export default function Upline() {
  const { desktop, upline } = useAppProvider();
  return (
    <Stack direction="row" spacing={3}>
      <Box
        sx={{
          p: 2,
          backgroundColor: "rgba(209, 209, 209, 0.5)",
          display: desktop ? "inline-flex" : "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          width: desktop ? "auto" : "100%",
        }}
      >
        <Typography variant="h6">Upline</Typography>
        <Stack
          direction={desktop ? "row" : "column"}
          spacing={2}
          sx={{ mt: 2 }}
        >
          <ListItem disablePadding>
            <ListItemIcon>
              <Avatar
                src={`https://flagcdn.com/w80/ph.png`}
                alt={`PH flag`}
                sx={{ width: 45, height: 20 }}
                variant="square"
              />
            </ListItemIcon>
            <Typography variant="body1">{upline?.name}</Typography>
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <EmailRoundedIcon />
            </ListItemIcon>
            <Typography variant="body1">{upline?.email}</Typography>
          </ListItem>
        </Stack>
        <Stack direction="column" spacing={2} sx={{ mt: 1 }}>
          <ListItem disablePadding>
            <ListItemIcon>
              <LocalPhoneRoundedIcon />
            </ListItemIcon>
            <Typography variant="body1">{upline?.phone}</Typography>
          </ListItem>
        </Stack>
      </Box>
    </Stack>
  );
}
