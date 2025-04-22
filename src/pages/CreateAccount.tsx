import React, { useState, useEffect } from "react";
import Content from "../layouts/Content";
import { Typography, Box, Button, Grid2 as Grid } from "@mui/material";
import { useAppProvider } from "../providers/AppProvider";
import CreateAccountStepper from "../utils/CreateAccountStepper";
import CreateAccountActiveContent from "../layouts/stepper/CreateAccountActiveContent";
import {
  AccountDetails,
  KeyValue,
  AutoCompleteValue,
  AutoCompleteType,
  CompletedSteps,
} from "../types";
import { userAccountFields } from "../helpers/user";
import SuspenseOverlay from "../layouts/SuspenseOverlay";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

interface ContentValue {
  content: string;
}

const steps = [
  "Basic Information",
  "Contacts & Socials",
  "Complete Address",
  "Personal Background",
];

export default function CreateAccount() {
  const { desktop, userAccount, completedSteps, handleUpdateCompletedStep } =
    useAppProvider();
  const international = userAccount.accountType === "international";
  const [activeStep, setActiveStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    ...userAccountFields,
    email: userAccount.email,
    personalBackground: {
      ...userAccountFields.personalBackground,
      email: userAccount.email,
    },
  });
  const [stepKey, setStepKey] =
    useState<keyof CompletedSteps>("basicInformation");

  const isNonEmpty = (value: string) => value?.trim?.() !== "";

  const hasLabel = (obj: AutoCompleteType) => {
    const _value = obj.value?.label?.trim?.();
    const notEmpty = _value !== "" && _value !== undefined;

    return notEmpty;
  };

  const validateBasicInformation = () => {
    const {
      firstName,
      middleName,
      lastName,
      sex,
      birthday,
      maritalStatus,
      citizenShip,
    } = accountDetails;
    const validName = [firstName, middleName, lastName].some(isNonEmpty);
    const validGender = hasLabel(sex);
    const validBirthday = isNonEmpty(birthday);
    const validMaritalStatus = hasLabel(maritalStatus);
    const validCitizenShip = isNonEmpty(citizenShip);
    const completed =
      validName &&
      validGender &&
      validBirthday &&
      validMaritalStatus &&
      validCitizenShip;

    handleUpdateCompletedStep(completed, "basicInformation");
  };

  const validateContactsAndSocials = () => {
    const { phoneNumber, mobileNumber, email, fbLink } = accountDetails;

    const validPhoneNumber = isNonEmpty(phoneNumber);
    const validMobileNumber = isNonEmpty(mobileNumber);
    const validEmail = isNonEmpty(email);
    const validFbLink = isNonEmpty(fbLink);
    const completed =
      validPhoneNumber && validMobileNumber && validEmail && validFbLink;

    handleUpdateCompletedStep(completed, "contactsAndSocials");
  };

  const validateCompleteAddress = () => {
    let completed = false;
    const { country, state, city, barangay, postalCode, address } =
      accountDetails;
    const validCountry = isNonEmpty(country);
    const validState = isNonEmpty(state);
    const validAddress = isNonEmpty(address);

    completed = validCountry && validState && validAddress;

    if (!international) {
      const validCity = isNonEmpty(city);
      const validBarangay = isNonEmpty(barangay);
      const validPostalCode = isNonEmpty(postalCode);

      completed = completed && validCity && validBarangay && validPostalCode;
    }

    handleUpdateCompletedStep(completed, "completeAddress");
  };

  const validatePersonalBackground = () => {
    const { institution, degree, specialSkills, about, references } =
      accountDetails.personalBackground;

    const validInstitution = isNonEmpty(institution);
    const validDegree = isNonEmpty(degree);
    const validSkills = isNonEmpty(specialSkills);
    const validAbout = isNonEmpty(about);
    const validRef = isNonEmpty(references);
    const completed =
      validInstitution && validDegree && validSkills && validAbout && validRef;

    handleUpdateCompletedStep(completed, "personalBackground");
  };

  const handleChangeStep = <K extends keyof CompletedSteps>(
    opr: string = "+"
  ) => {
    setActiveStep((prevActiveStep) => {
      const nextStep = opr === "-" ? prevActiveStep - 1 : prevActiveStep + 1;
      const currentStepKey: K = Object.keys(completedSteps).find(
        (v, i) => i === nextStep
      ) as K;

      setStepKey(currentStepKey);

      return nextStep;
    });
  };

  const handleNext = () => {
    if (stepKey === "completeAddress") {
      handleSave();

      return;
    }

    handleChangeStep();
  };
  const handlePrev = () => handleChangeStep("-");

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
    const k: K = e.target.name as K;
    const v = e.target.value;

    setAccountDetails((prev) => ({
      ...prev,
      [k]: {
        ...(prev[k] as ContentValue),
        content: v,
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      accountDetails.gender = accountDetails.sex.value?.label === "Female";
      const payLoad = {
        ...accountDetails,
        maritalStatus: accountDetails.maritalStatus?.value?.label,
      };

      console.log(payLoad);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const validateStepComponent = () => {
    if (stepKey === "basicInformation") {
      validateBasicInformation();
    }

    if (stepKey === "contactsAndSocials") {
      validateContactsAndSocials();
    }

    if (stepKey === "completeAddress") {
      validateCompleteAddress();
    }

    if (stepKey === "personalBackground") {
      validatePersonalBackground();
    }
  };

  useEffect(() => {
    validateStepComponent();
  }, [accountDetails]);

  return (
    <Content>
      <Typography
        variant={desktop ? "h4" : "h5"}
        component="div"
        sx={{ textAlign: "center" }}
        fontWeight={600}
      >
        Create Account
      </Typography>
      <Box sx={{ my: 5 }}>
        <CreateAccountStepper activeStep={activeStep} steps={steps} />
      </Box>
      <Box
        sx={{
          height: desktop && activeStep < steps.length - 1 ? "45vh" : "auto",
        }}
      >
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
          disabled={!completedSteps[stepKey]}
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
