import React, { useState } from "react";
import Content from "../layouts/Content";
import {
  Typography,
  FormControl,
  Stack,
  Box,
  Button,
  Avatar,
  ListItem,
  ListItemIcon,
  TextField,
  Checkbox,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CustomTextField from "../utils/CustomTextField";
import { useAppProvider } from "../providers/AppProvider";
import mainIcon from "../assets/main-icon.png";
import Upline from "../components/Upline";

export default function Main() {
  const { desktop, handleUserAccount, userAccount } = useAppProvider();
  const [errorEmail, setErrorEmail] = useState<string | null>(null);

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const key = e.target.name;

    if (errorEmail) {
      setErrorEmail(null);
    }

    handleUserAccount(key, value);
  };

  const validateEmailAddress = () => {
    const isEmpty = userAccount.email === "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(userAccount.email);
    let error = null;

    if (isEmpty) {
      error = "Please enter your email address.";
    }

    if (!validEmail) {
      error = "Invalid email address.";
    }

    setErrorEmail(error);
  };

  const verifyEmailAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmailAddress();
  };

  return (
    <Content>
      <Typography
        variant={desktop ? "h4" : "h5"}
        component="div"
        sx={{ textAlign: "center" }}
        fontWeight={600}
      >
        Sign up as a Salesperson
      </Typography>
      <Stack direction="row" spacing={10} sx={{ mt: 5 }}>
        <Box width={desktop ? "auto" : "100%"}>
          <Upline />
          <Stack spacing={2} direction="column" sx={{ mt: 2 }}>
            <Typography
              variant={desktop ? "h5" : "h6"}
              component="div"
              fontWeight={600}
            >
              Create Account
            </Typography>
            {userAccount.verificationCode ? (
              <>
                <Typography variant="body1">
                  Please enter the verification code sent to your email:
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ddd",
                    display: "flex",
                  }}
                >
                  <TextField
                    fullWidth
                    autoComplete="off"
                    placeholder="Verification Code"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          mr: 1,
                          border: "none",
                        },
                      },
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 0 }}
                  disableElevation
                  color="error"
                >
                  Proceed
                </Button>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon
                      sx={{ fontSize: desktop ? 30 : 25 }}
                    />
                  </ListItemIcon>
                  <Typography variant={desktop ? "h6" : "body1"}>
                    National
                  </Typography>
                </ListItem>
                <FormControl
                  component="form"
                  onSubmit={(e) => verifyEmailAddress(e)}
                  sx={{ gap: 2 }}
                >
                  <CustomTextField
                    name="email"
                    placeholder="Email Address"
                    value={userAccount.email}
                    handleChange={handleChangeField}
                    error={errorEmail}
                  />
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <Checkbox
                        color="error"
                        name="agreed"
                        checked={userAccount.agreed}
                        onChange={(e, v) => handleUserAccount(e.target.name, v)}
                      />
                    </ListItemIcon>
                    <Typography variant="body1">
                      I agree to the terms and condition of {desktop && <br />}
                      LR Contract and the website.
                    </Typography>
                  </ListItem>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ borderRadius: 0 }}
                    disableElevation
                    color="error"
                    disabled={!userAccount.agreed}
                  >
                    Proceed
                  </Button>
                </FormControl>
              </>
            )}
          </Stack>
        </Box>
        {desktop && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              src={mainIcon}
              alt={`Main Icon`}
              sx={{ width: "auto", height: "100%" }}
              variant="square"
            />
          </Box>
        )}
      </Stack>
    </Content>
  );
}
