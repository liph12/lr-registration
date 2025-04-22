import { Stack, Grid2 as Grid, Autocomplete } from "@mui/material";
import CustomTextField from "../utils/CustomTextField";
import { AccountDetailsHandler } from "../types";
import Label from "../utils/Label";

interface AutoCompleteValue {
  id: number;
  label: string;
}

const sexAutocomplete = [
  {
    id: 1,
    label: "Male",
  },
  {
    id: 2,
    label: "Female",
  },
];

const maritalStatusAutocomplete = [
  {
    id: 1,
    label: "Single",
  },
  {
    id: 2,
    label: "Married",
  },
  {
    id: 3,
    label: "Separated",
  },
];

export default function BasicInformation({
  handleChange,
  accountDetails,
  handleChangeAutocomplete,
  handleChangeAutocompleteContent,
}: AccountDetailsHandler) {
  const handleChangeSex = (v: AutoCompleteValue | null) =>
    handleChangeAutocomplete("sex", sexAutocomplete, v);

  const handleChangeMaritalStatus = (v: AutoCompleteValue | null) =>
    handleChangeAutocomplete("maritalStatus", maritalStatusAutocomplete, v);

  return (
    <>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="First Name" />
          <CustomTextField
            handleChange={handleChange}
            name="firstName"
            placeholder="First Name"
            value={accountDetails.firstName}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Middle Name" />
          <CustomTextField
            handleChange={handleChange}
            name="middleName"
            placeholder="Middle Name"
            value={accountDetails.middleName}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Last Name" />
          <CustomTextField
            handleChange={handleChange}
            name="lastName"
            placeholder="Last Name"
            value={accountDetails.lastName}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Sex" />
          <Autocomplete
            options={sexAutocomplete}
            value={accountDetails.sex.value}
            renderInput={(params) => (
              <CustomTextField
                params={params}
                handleChange={handleChangeAutocompleteContent}
                name="sex"
                placeholder="Sex"
                value={accountDetails.sex.content}
              />
            )}
            onChange={(e, v) => {
              handleChangeSex(v);
            }}
            isOptionEqualToValue={(option, value) =>
              value === undefined || option.id === value.id
            }
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Date of Birth" />
          <CustomTextField
            type="date"
            handleChange={handleChange}
            name="birthday"
            placeholder="Date of Birth"
            value={accountDetails.birthday}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Marital Status" />
          <Autocomplete
            options={maritalStatusAutocomplete}
            value={accountDetails.maritalStatus.value}
            renderInput={(params) => (
              <CustomTextField
                params={params}
                handleChange={handleChangeAutocompleteContent}
                name="maritalStatus"
                placeholder="Marital Status"
                value={accountDetails.maritalStatus.content}
              />
            )}
            onChange={(e, v) => {
              handleChangeMaritalStatus(v);
            }}
            isOptionEqualToValue={(option, value) =>
              value === undefined || option.id === value.id
            }
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Citizenship" />
          <CustomTextField
            handleChange={handleChange}
            name="citizenShip"
            placeholder="Citizenship"
            value={accountDetails.citizenShip}
          />
        </Stack>
      </Grid>
    </>
  );
}
