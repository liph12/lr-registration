import React, { useEffect, useState } from "react";
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
  Checkbox,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CustomTextField from "../utils/CustomTextField";
import { useAppProvider } from "../providers/AppProvider";
import mainIcon from "../assets/main-icon.png";
import Upline from "../components/Upline";
import { getSelectedAddress, clearAddress } from "../helpers";
import { UserAccount } from "../types";
import SuspenseOverlay from "../layouts/SuspenseOverlay";
import useAxios from "../hooks/useAxios";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const BASIC = 1;
const PERSONAL_BG = 2;
const ACCOUNT = 3;
const REGISTERED = 4;

interface Verification {
  verified: boolean;
  status: {
    basic: boolean;
    personalBg: boolean;
    account: boolean;
    registered: boolean;
  };
}

export default function Main() {
  const { desktop, handleUserAccount, userAccount, upline } = useAppProvider();
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorVerificationCode, setErrorVerificationCode] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userVerification, setUserVerification] = useState<Verification | null>(
    null
  );
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const international = userAccount.accountType === "international";

  const handleChangeField = <K extends keyof UserAccount>(
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const key: K = e.target.name as K;

    if (errorEmail) {
      setErrorEmail(null);
    }

    if (errorVerificationCode) {
      setErrorVerificationCode(null);
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

    return error;
  };

  const updateUserVerification = (res: AxiosResponse) => {
    const u = res.data[0];
    const _verified = u.verification === "verified";
    const _status = u.details.registration_status;

    const verification: Verification = {
      verified: _verified,
      status: {
        basic: _status === BASIC,
        personalBg: _status === PERSONAL_BG,
        account: _status === ACCOUNT,
        registered: _status === REGISTERED,
      },
    };

    setUserVerification(verification);
  };

  const verifyEmailAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isError = validateEmailAddress();

    if (isError) {
      return;
    }

    setLoading(true);

    try {
      const payLoad = JSON.stringify(userAccount);
      const response = await axiosInstance.post(`confirm-email`, payLoad, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const userData = response.data[0];
        const registered = userData.details.registration_status === 4;

        if (registered) {
          setErrorEmail("Email is already taken");
        } else {
          updateUserVerification(response);
        }
      }
    } catch (e) {
      const error = e as AxiosError;

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitVerificationCode = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (userAccount.verificationCode === "") {
      setErrorVerificationCode("Please fill-up the verification code.");
      return;
    }

    setLoading(true);

    try {
      const payLoad = JSON.stringify({
        code: userAccount.verificationCode,
        email: userAccount.email,
      });
      const response = await axiosInstance.post(
        `submit-verification`,
        payLoad,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        updateUserVerification(response);
      }
    } catch (e) {
      const error = e as AxiosError;

      if (error.response) {
        if (error.response.status === 403) {
          setErrorVerificationCode("Invalid verification code.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentAddress = getSelectedAddress();

    if (currentAddress) {
      clearAddress();
    }
  }, []);

  useEffect(() => {
    if (userVerification?.verified) {
      const typeUrl = international ? "&type=international" : "";
      navigate(`create-account?ref=${upline?.id}${typeUrl}`);
    }
  }, [userVerification]);

  return (
    <Content>
      {loading && <SuspenseOverlay />}
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
            {userVerification ? (
              <FormControl
                component="form"
                onSubmit={(e) => handleSubmitVerificationCode(e)}
                sx={{ gap: 2 }}
              >
                <Typography variant="body1">
                  Please enter the verification code sent to your email:
                </Typography>
                <CustomTextField
                  name="verificationCode"
                  placeholder="Verification Code"
                  value={userAccount.verificationCode}
                  handleChange={handleChangeField}
                  error={errorVerificationCode}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: 0 }}
                  disableElevation
                  color="error"
                >
                  Proceed
                </Button>
              </FormControl>
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
                        onChange={(e, v) => handleUserAccount("agreed", v)}
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
