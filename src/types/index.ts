import React from "react";

export interface KeyValue {
  name: "string";
  value: "string";
}

export interface AutoCompleteValue {
  id: number;
  label: string;
}

export interface AutoCompleteType {
  select: AutoCompleteValue[];
  value: AutoCompleteValue | null;
  content: string;
}

export interface PersonalBackground {
  institution: string;
  degree: string;
  specialSkills: string;
  workExperience: string;
  about: string;
  references: string;
  email: string;
}

export interface AccountDetails {
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  sex: AutoCompleteType;
  country: string;
  state: string;
  city: string;
  barangay: string;
  birthday: string;
  address: string;
  postalCode: string;
  mobileNumber: string;
  phoneNumber: string;
  citizenShip: string;
  maritalStatus: string;
  tin: string;
  fbLink: string;
  personalBackground: PersonalBackground;
}

export interface AccountDetailsHandler {
  step: number;
  accountDetails: AccountDetails;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | null,
    obj?: KeyValue | null
  ) => void;
  handleChangeAutocomplete: <K extends keyof AccountDetails>(
    k: K,
    s: AutoCompleteValue[],
    v: AutoCompleteValue | null
  ) => void;
  handleChangeAutocompleteContent: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}
