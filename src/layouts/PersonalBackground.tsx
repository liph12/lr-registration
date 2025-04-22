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
      <Grid size={{ lg: 6, md: 6, xs: 12 }}>
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
      <Grid size={{ lg: 6, md: 6, xs: 12 }}>
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
      <Grid size={{ lg: 6, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Skills" />
          <CustomTextField
            props={{
              multiline: true,
              rows: 4,
            }}
            handleChange={handleChange}
            name="specialSkills"
            placeholder="Skills"
            value={accountDetails.personalBackground.specialSkills}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 6, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Work Experience (Optional)" required={false} />
          <CustomTextField
            props={{
              multiline: true,
              rows: 4,
            }}
            handleChange={handleChange}
            name="workExperience"
            placeholder="Work Experience"
            value={accountDetails.personalBackground.workExperience}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 6, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="About Yourself" />
          <CustomTextField
            props={{
              multiline: true,
              rows: 4,
            }}
            handleChange={handleChange}
            name="about"
            placeholder="About Yourself"
            value={accountDetails.personalBackground.about}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 6, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Contact & References" />
          <CustomTextField
            props={{
              multiline: true,
              rows: 4,
            }}
            handleChange={handleChange}
            name="references"
            placeholder="Contact & References"
            value={accountDetails.personalBackground.references}
          />
        </Stack>
      </Grid>
    </>
  );
}
