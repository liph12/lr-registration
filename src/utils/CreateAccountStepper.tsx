import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useAppProvider } from "../providers/AppProvider";

interface CreateAccountStepperProps {
  activeStep: number;
  steps: Array<string>;
}

export default function CreateAccountStepper({
  activeStep,
  steps,
}: CreateAccountStepperProps) {
  const { desktop } = useAppProvider();

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel={!desktop}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  fontSize: desktop ? 30 : 20,
                  color: index === activeStep ? "error.main" : "#bbb",
                  "&.Mui-active": {
                    color: "error.main",
                  },
                  "&.Mui-completed": {
                    color: "success.main",
                  },
                },
              }}
              sx={{
                "& .MuiStepLabel-label": {
                  color: index === activeStep ? "error.main" : "#bbb",
                  fontWeight: index === activeStep ? "bold" : "normal",
                  fontSize: desktop ? 18 : 13,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
