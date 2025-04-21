import React, { useState } from "react";
import Content from "../layouts/Content";
import { Typography, Box, Button, Grid2 as Grid } from "@mui/material";
import { useAppProvider } from "../providers/AppProvider";
import CreateAccountStepper from "../utils/CreateAccountStepper";
import CreateAccountActiveContent from "../layouts/stepper/CreateAccountActiveContent";
import { AccountDetails, KeyValue, AutoCompleteValue } from "../types";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const steps = [
  "Basic Information",
  "Contacts and Socials",
  "Complete Address",
  "Personal Background",
];

export default function CreateAccount() {
  const { desktop, userAccount } = useAppProvider();
  const [activeStep, setActiveStep] = useState(0);
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    email: userAccount.email,
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Male",
    sex: {
      select: [
        {
          id: 1,
          label: "Male",
        },
        {
          id: 2,
          label: "Female",
        },
      ],
      value: null,
      content: "",
    },
    country: "Philippines",
    state: "",
    city: "",
    barangay: "",
    birthday: "",
    address: "",
    postalCode: "",
    mobileNumber: "",
    phoneNumber: "",
    citizenShip: "",
    maritalStatus: "",
    tin: "",
    fbLink: "",
    personalBackground: {
      institution: "",
      degree: "",
      specialSkills: "",
      workExperience: "",
      about: "",
      references: "",
      email: userAccount.email,
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | null,
    obj?: KeyValue | null
  ) => {
    let k: string | any = "";
    let v: string | any = "";

    if (e) {
      k = e.target.name;
      v = e.target.value;
    } else {
      k = obj?.name;
      v = obj?.value;
    }

    setAccountDetails((prev) => ({
      ...prev,
      [k]: v,
    }));
  };

  const handleChangePersonalBg = (
    e: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    const k: any = e?.target.name;
    const v = e?.target.value;

    setAccountDetails((prev) => ({
      ...prev,
      personalBackground: {
        ...prev.personalBackground,
        [k]: v,
      },
    }));
  };

  const handleChangeAutocomplete = <K extends keyof AccountDetails>(
    k: K,
    s: AutoCompleteValue[],
    v: AutoCompleteValue | null
  ) => {
    setAccountDetails((prev) => ({
      ...prev,
      [k]: {
        ...[k],
        select: s,
        value: v,
      },
    }));
  };

  const handleChangeAutocompleteContent = <K extends keyof AccountDetails>(
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const k: K = e.target.name;
    const v = e.target.value;

    setAccountDetails((prev) => ({
      ...prev,
      [k]: {
        ...prev[k],
        content: v,
      },
    }));
  };

  return (
    <Content>
      <Typography
        variant={desktop ? "h4" : "h5"}
        component="div"
        sx={{ textAlign: "center" }}
        fontWeight={600}
      >
        Create Account {accountDetails.sex.content}
      </Typography>
      <Box sx={{ my: 5 }}>
        <CreateAccountStepper activeStep={activeStep} steps={steps} />
      </Box>
      <Box sx={{ height: "45vh" }}>
        <Grid container spacing={3}>
          <CreateAccountActiveContent
            step={activeStep + 1}
            handleChange={
              activeStep < steps.length - 1
                ? handleChange
                : handleChangePersonalBg
            }
            accountDetails={accountDetails}
            handleChangeAutocomplete={handleChangeAutocomplete}
            handleChangeAutocompleteContent={handleChangeAutocompleteContent}
          />
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 0 }}
          disableElevation
          color="inherit"
          onClick={handlePrev}
          disabled={activeStep === 0}
          startIcon={<WestIcon />}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 0 }}
          disableElevation
          color="error"
          onClick={handleNext}
          endIcon={<EastIcon />}
        >
          Next
        </Button>
      </Box>
    </Content>
  );
}
