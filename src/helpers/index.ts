import { AutoCompleteValue } from "../types";

interface Address {
  country: AutoCompleteValue | null;
  province: AutoCompleteValue | null;
  city: AutoCompleteValue | null;
  barangay: AutoCompleteValue | null;
}

export const getSelectedAddress = () =>
  JSON.parse(localStorage.getItem("selectedAddress") ?? "null");

export const storeSelectedAddress = (address: Address) => {
  const addressJson = JSON.stringify(address);

  localStorage.setItem("selectedAddress", addressJson);
};

export const clearAddress = () => localStorage.removeItem("selectedAddress");
