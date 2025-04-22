import { AutoCompleteValue } from "../types";

type AutcompleteAction = {
  type: "SET_AUTOCOMPLETE";
  payload: AutoCompleteValue[];
};

type AutcompleteValueAction = {
  type: "SET_AUTOCOMPLETE_VALUE";
  payload: AutoCompleteValue;
};

export const autocompleteProvinceReducer = (
  state: AutoCompleteValue[],
  action: AutcompleteAction
): AutoCompleteValue[] => {
  switch (action.type) {
    case "SET_AUTOCOMPLETE":
      return action.payload;
    default:
      return state;
  }
};

export const autocompleteValueProvinceReducer = (
  state: AutoCompleteValue,
  action: AutcompleteValueAction
): AutoCompleteValue => {
  switch (action.type) {
    case "SET_AUTOCOMPLETE_VALUE":
      return action.payload;
    default:
      return state;
  }
};
