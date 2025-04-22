import { useState, useEffect } from "react";
import { Stack, Grid2 as Grid, Autocomplete, Box } from "@mui/material";
import SuspenseOverlay from "./SuspenseOverlay";
import CustomTextField from "../utils/CustomTextField";
import {
  AccountDetailsHandler,
  KeyValue,
  AutoCompleteValue,
  AutoCompleteType,
} from "../types";
import Label from "../utils/Label";
import {
  countriesData,
  provinces as provincesData,
  cities as citiesData,
  countriesArray as countryCodes,
} from "../data";
import { getSelectedAddress, storeSelectedAddress } from "../helpers";
import { useAppProvider } from "../providers/AppProvider";
import useAxios from "../hooks/useAxios";

interface CountryAutoComplete {
  id: number;
  label: string;
  code: string | undefined;
  data: Array<string>;
}

interface CountryAutoCompleteType {
  select: CountryAutoComplete[];
  value: CountryAutoComplete | null;
  content: string;
}

const countryAutocompleteDef: CountryAutoCompleteType = {
  select: [
    {
      id: 0,
      label: "Not found.",
      code: "",
      data: [],
    },
  ],
  value: null,
  content: "",
};

const autocompleteDef: AutoCompleteType = {
  select: [
    {
      id: 0,
      label: "Not found.",
    },
  ],
  value: null,
  content: "",
};

const _country: CountryAutoComplete = {
  id: 1,
  label: "Philippines",
  code: "PH",
  data: [],
};

export default function CompleteAddress({
  handleChange,
  accountDetails,
}: AccountDetailsHandler) {
  const axiosInstance = useAxios();
  const tmpCountriesArray = Object.keys(countriesData);
  const { userAccount } = useAppProvider();
  const international = userAccount.accountType === "international";
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<CountryAutoCompleteType>(
    countryAutocompleteDef
  );
  const [countryStates, setCountryStates] =
    useState<AutoCompleteType>(autocompleteDef);
  const [provinces, setProvinces] = useState<AutoCompleteType>(autocompleteDef);
  const [cities, setCities] = useState<AutoCompleteType>(autocompleteDef);
  const [barangays, setBarangays] = useState<AutoCompleteType>(autocompleteDef);
  const lgGridSize = international ? 6 : 4;

  const createMunicipality = (
    v: AutoCompleteValue | null,
    b: AutoCompleteValue[],
    p: KeyValue | null
  ) => {
    setCities((prevState) => ({
      ...prevState,
      value: v,
    }));
    setBarangays({ select: b, value: null, content: "" });
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

      storeSelectedAddress({
        country: _country,
        province: v,
        city: null,
        barangay: null,
      });
    }
    const postalCodeValue = { name: "postalCode", value: "" };
    const provValue = { name: "state", value: v?.label ?? "" };

    setProvinces((prevState) => ({
      ...prevState,
      value: v,
    }));
    setCities({ select: citiesArray, value: null, content: "" });
    createMunicipality(null, [], postalCodeValue as KeyValue);
    handleChange(null, provValue as KeyValue);
  };

  const handleChangeCity = async (v: AutoCompleteValue | null) => {
    let barangaysArray: AutoCompleteValue[] = [];
    let postalCode: string = "";

    if (v) {
      try {
        setLoading(true);

        const currentAddress = getSelectedAddress();
        const { barangay } = currentAddress;
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

        const postalCodeValue = { name: "postalCode", value: postalCode };
        const cityValue = { name: "city", value: v?.label ?? "" };

        if (provinces.value) {
          storeSelectedAddress({
            country: _country,
            province: provinces?.value,
            city: v,
            barangay: barangay,
          });
        }

        createMunicipality(v, barangaysArray, postalCodeValue as KeyValue);
        handleChange(null, cityValue as KeyValue);
        if (barangay) {
          setBarangays((prevState) => ({
            ...prevState,
            value: barangay,
          }));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangeBarangay = (v: AutoCompleteValue | null) => {
    const barangayValue = { name: "barangay", value: v?.label ?? "" };

    setBarangays((prevState) => ({
      ...prevState,
      value: v,
    }));

    storeSelectedAddress({
      country: _country,
      province: provinces?.value,
      city: cities.value,
      barangay: v,
    });
    handleChange(null, barangayValue as KeyValue);
  };

  const handleChangeCountry = (v: CountryAutoComplete | null) => {
    let states: AutoCompleteValue[] = [];

    if (v) {
      states = v.data.map((state, key) => {
        return {
          id: key + 1,
          label: state,
        };
      });

      states = Array.from(
        new Map(states.map((item) => [item.label, item])).values()
      );

      storeSelectedAddress({
        country: { id: v.id, label: v.label },
        province: null,
        city: null,
        barangay: null,
      });
    }
    const countryValue = { name: "country", value: v?.label ?? "" };

    setCountry((prevState) => ({
      ...prevState,
      value: v,
    }));
    setCountryStates((prevState) => ({
      ...prevState,
      select: states,
      value: null,
    }));
    handleChange(null, countryValue as KeyValue);
  };

  const handleChangeCountryState = (v: AutoCompleteValue | null) => {
    const stateValue = { name: "state", value: v?.label ?? "" };

    storeSelectedAddress({
      country: country.value,
      province: v,
      city: null,
      barangay: null,
    });
    setCountryStates((prevState) => ({
      ...prevState,
      value: v,
    }));
    handleChange(null, stateValue as KeyValue);
  };

  const initializeAddress = () => {
    const countriesArray: CountryAutoComplete[] = tmpCountriesArray.map(
      (key, index) => {
        const countryName = countriesData[key].name;
        const countryData = countriesData[key].data;
        const code = countryCodes.find(
          (country) => country.name === countryName
        )?.code;

        return {
          id: index + 1,
          label: countryName,
          code: code,
          data: countryData,
        };
      }
    );
    const countriesSorted = countriesArray.sort((a, b) =>
      a.label.localeCompare(b.label)
    );
    const currentAddress = getSelectedAddress();
    const provArray = Array.from(
      new Map(
        provincesData.map((prov) => [
          prov.name,
          { id: prov.value, label: prov.name },
        ])
      ).values()
    );

    let currentCountry = _country;

    if (international && currentAddress) {
      const _tmpCountry = currentAddress?.country;
      const currCountryStates = countriesArray.find(
        (c) => c.id === _tmpCountry?.id
      );

      if (currCountryStates) {
        let _states: AutoCompleteValue[] = currCountryStates.data.map(
          (state, key) => ({ id: key + 1, label: state })
        );

        _states = Array.from(
          new Map(_states.map((item) => [item.label, item])).values()
        );

        currentCountry = _tmpCountry;
        setCountryStates((prevState) => ({
          ...prevState,
          select: _states,
          value: currentAddress?.province ?? null,
        }));
      }
    }

    setCountry((prevState) => ({
      ...prevState,
      select: countriesSorted,
      value: currentCountry,
    }));
    setProvinces({
      select: provArray,
      value: currentAddress?.province ?? null,
      content: "",
    });
  };

  useEffect(() => {
    initializeAddress();
  }, []);

  useEffect(() => {
    const currentAddress = getSelectedAddress();

    if (provinces.value && !international) {
      handleChangeCity(currentAddress?.city ?? null);
    }
  }, [provinces.value]);

  return (
    <>
      {loading && <SuspenseOverlay />}
      <Grid size={{ lg: lgGridSize, md: 6, xs: 12 }}>
        <Stack spacing={1}>
          <Label title="Country" />
          {international ? (
            <Autocomplete
              options={country.select}
              value={country.value}
              renderOption={(props, option) => {
                const { key, ...rest } = props;

                return (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    key={key}
                    {...rest}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code?.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code?.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <CustomTextField
                  params={params}
                  handleChange={handleChange}
                  name="country"
                  placeholder="Country"
                  value={accountDetails.country}
                />
              )}
              onChange={(e, v) => {
                handleChangeCountry(v);
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || option.id === value.id
              }
            />
          ) : (
            <CustomTextField
              handleChange={handleChange}
              name="country"
              placeholder="Country"
              value={accountDetails.country}
            />
          )}
        </Stack>
      </Grid>
      <Grid size={{ lg: lgGridSize, md: 6, xs: 12 }}>
        {international ? (
          <Stack spacing={1}>
            <Label title="City/State" />
            <Autocomplete
              options={countryStates.select}
              value={countryStates.value}
              renderInput={(params) => (
                <CustomTextField
                  params={params}
                  handleChange={handleChange}
                  name="state"
                  placeholder="City/State"
                  value={accountDetails.state}
                />
              )}
              onChange={(e, v) => {
                handleChangeCountryState(v);
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || option.id === value.id
              }
            />
          </Stack>
        ) : (
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
        )}
      </Grid>
      {!international && (
        <>
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
                onChange={(e, v) => handleChangeBarangay(v)}
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
                placeholder="Postal Code"
                value={accountDetails.postalCode}
              />
            </Stack>
          </Grid>
        </>
      )}
      <Grid size={{ lg: lgGridSize, md: 6, xs: 12 }}>
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
