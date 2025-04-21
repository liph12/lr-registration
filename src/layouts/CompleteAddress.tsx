import { useState, useEffect } from "react";
import { Stack, Grid2 as Grid, Autocomplete } from "@mui/material";
import CustomTextField from "../utils/CustomTextField";
import { AccountDetailsHandler, KeyValue } from "../types";
import Label from "../utils/Label";
import {
  countriesData,
  provinces as provincesData,
  cities as citiesData,
  countriesArray as countryCodes,
} from "../data";
import useAxios from "../hooks/useAxios";

interface AutoCompleteValue {
  id: number;
  label: string;
}

interface AutoCompleteType {
  select: AutoCompleteValue[];
  value: AutoCompleteValue | null;
}

export default function CompleteAddress({
  handleChange,
  accountDetails,
}: AccountDetailsHandler) {
  const axiosInstance = useAxios();
  const tmpCountriesArray = Object.keys(countriesData);
  const countriesArray = tmpCountriesArray.map((key, index) => {
    const countryName = countriesData[key].name;
    const countryData = countriesData[key].data;
    const code = countryCodes.find(
      (country) => country.name === countryName
    )?.code;

    return {
      id: index,
      label: countryName,
      code: code,
      data: countryData,
    };
  });

  const countriesSorted = countriesArray.sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const [country, setCountry] = useState<AutoCompleteType>({
    select: countriesSorted,
    value: null,
  });

  const [countryStates, setCountryStates] = useState<AutoCompleteType>({
    select: [
      {
        id: 0,
        label: "Not found.",
      },
    ],
    value: null,
  });

  const [provinces, setProvinces] = useState<AutoCompleteType>({
    select: [
      {
        id: 0,
        label: "Not found.",
      },
    ],
    value: null,
  });
  const [cities, setCities] = useState<AutoCompleteType>({
    select: [
      {
        id: 0,
        label: "Not found.",
      },
    ],
    value: null,
  });
  const [barangays, setBarangays] = useState<AutoCompleteType>({
    select: [
      {
        id: 0,
        label: "Not found.",
      },
    ],
    value: null,
  });

  const createMunicipality = (
    v: AutoCompleteValue | null,
    b: AutoCompleteValue[],
    p: KeyValue | null
  ) => {
    setCities((prevState) => ({
      ...prevState,
      value: v,
    }));
    setBarangays({ select: b, value: null });
    handleChange(null, p);
  };

  const handleChangeProvince = (v: AutoCompleteValue | null) => {
    let citiesArray: AutoCompleteValue[] = [];

    if (v) {
      citiesArray = citiesData
        .filter((city) => city.provId === v.id)
        .map((city) => {
          return {
            id: city.value,
            label: city.name,
          };
        });
    }
    const postalCodeValue = { name: "postalCode", value: "" };

    setProvinces((prevState) => ({
      ...prevState,
      value: v,
    }));
    setCities({ select: citiesArray, value: null });
    createMunicipality(null, [], postalCodeValue as KeyValue);
  };

  const handleChangeCity = async (v: AutoCompleteValue | null) => {
    let barangaysArray: AutoCompleteValue[] = [];
    let postalCode: string = "";

    if (v) {
      const response = await axiosInstance.get(
        `/get-municipality-brgy/${v.id}`
      );
      const brgyData = response.data.tbl_barangay;

      postalCode = brgyData[0].postal;
      barangaysArray = brgyData.map((brgy: any) => {
        return {
          id: brgy.id,
          label: brgy.name,
        };
      });
    }

    const postalCodeValue = { name: "postalCode", value: postalCode };
    createMunicipality(v, barangaysArray, postalCodeValue as KeyValue);
  };

  useEffect(() => {
    const provArray = Array.from(
      new Map(
        provincesData.map((prov) => [
          prov.name,
          { id: prov.value, label: prov.name },
        ])
      ).values()
    );

    setProvinces({ select: provArray, value: null });
  }, []);

  return (
    <>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Country" />
          <CustomTextField
            handleChange={handleChange}
            name="country"
            placeholder="Country"
            value={accountDetails.country}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Province" />
          <Autocomplete
            options={provinces.select}
            value={provinces.value}
            renderInput={(params) => (
              <CustomTextField
                params={params}
                handleChange={handleChange}
                name="state"
                placeholder="Province"
                value={accountDetails.state}
              />
            )}
            onChange={(e, v) => {
              handleChangeProvince(v);
            }}
            isOptionEqualToValue={(option, value) =>
              value === undefined || option.id === value.id
            }
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="City" />
          <Autocomplete
            options={cities.select}
            value={cities.value}
            renderInput={(params) => (
              <CustomTextField
                params={params}
                handleChange={handleChange}
                name="city"
                placeholder="City"
                value={accountDetails.city}
              />
            )}
            onChange={(e, v) => {
              handleChangeCity(v);
            }}
            isOptionEqualToValue={(option, value) =>
              value === undefined || option.id === value.id
            }
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Barangay" />
          <Autocomplete
            options={barangays.select}
            value={barangays.value}
            renderInput={(params) => (
              <CustomTextField
                params={params}
                handleChange={handleChange}
                name="barangay"
                placeholder="Barangay"
                value={accountDetails.barangay}
              />
            )}
            onChange={(e, v) => {
              setBarangays((prevState) => ({
                ...prevState,
                value: v,
              }));
            }}
            isOptionEqualToValue={(option, value) =>
              value === undefined || option.id === value.id
            }
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Postal Code" />
          <CustomTextField
            handleChange={handleChange}
            name="postalCode"
            placeholder="Postla Code"
            value={accountDetails.postalCode}
          />
        </Stack>
      </Grid>
      <Grid size={{ lg: 8, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Address" />
          <CustomTextField
            handleChange={handleChange}
            name="address"
            placeholder="Address"
            value={accountDetails.address}
          />
        </Stack>
      </Grid>
    </>
  );
}
