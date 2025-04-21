import { Stack, Grid2 as Grid } from "@mui/material";
import CustomTextField from "../utils/CustomTextField";
import Label from "../utils/Label";
import { AccountDetailsHandler } from "../types";

export default function PersonalBackground({
  handleChange,
  accountDetails,
}: AccountDetailsHandler) {
  return (
    <>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="School/College" />
          <CustomTextField
            handleChange={handleChange}
            name="institution"
            placeholder="School/College"
            value={accountDetails.personalBackground.institution}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Degree/Course" />
          <CustomTextField
            handleChange={handleChange}
            name="degree"
            placeholder="Degree/Course"
            value={accountDetails.personalBackground.degree}
          />
        </Stack>
      </Grid>
    </>
  );
}
