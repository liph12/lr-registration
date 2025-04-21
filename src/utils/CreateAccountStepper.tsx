import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

interface CreateAccountStepperProps {
  activeStep: number;
  steps: Array<string>;
}

export default function CreateAccountStepper({
  activeStep,
  steps,
}: CreateAccountStepperProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  fontSize: 30,
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
                  fontSize: 18,
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
