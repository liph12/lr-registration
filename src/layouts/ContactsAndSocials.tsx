import { Stack, Grid2 as Grid } from "@mui/material";
import CustomTextField from "../utils/CustomTextField";
import { AccountDetailsHandler } from "../types";
import Label from "../utils/Label";

export default function ContactAndSocials({
  handleChange,
  accountDetails,
}: AccountDetailsHandler) {
  return (
    <>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Phone Number" />
          <CustomTextField
            handleChange={handleChange}
            name="phoneNumber"
            placeholder="Phone Number"
            value={accountDetails.phoneNumber}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Mobile Number" />
          <CustomTextField
            handleChange={handleChange}
            name="mobileNumber"
            placeholder="Mobile Number"
            value={accountDetails.mobileNumber}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Email" />
          <CustomTextField
            handleChange={handleChange}
            name="email"
            placeholder="Email"
            value={accountDetails.email}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="TIN (Optional)" required={false} />
          <CustomTextField
            handleChange={handleChange}
            name="tin"
            placeholder="TIN (Optional)"
            value={accountDetails.tin}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 6, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Facebook Link" />
          <CustomTextField
            handleChange={handleChange}
            name="fbLink"
            placeholder="(Example: https://facebook.com/filipinohomes)"
            value={accountDetails.fbLink}
          />
        </Stack>
      </Grid>
    </>
  );
}
