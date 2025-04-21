import { TextField, Button } from "@mui/material";

interface Field {
  key: string;
  label: string;
  placeholder: string;
  type: string;
  value: string;
}

const defaultFields = [
  {
    key: "firstName",
    label: "First Name",
    placeholder: "First Name",
    type: "text",
    value: "",
  },
  {
    key: "middleName",
    label: "Middle Name",
    placeholder: "Middle Name",
    type: "text",
    value: "",
  },
  {
    key: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
    type: "text",
    value: "",
  },
  {
    key: "gender",
    label: "Gender",
    placeholder: "Gender",
    type: "text",
    value: "",
  },
  {
    key: "birthday",
    label: "Date of Birth",
    placeholder: "",
    type: "text",
    value: "",
  },
  { key: "", label: "", placeholder: "", type: "text", value: "" },
  { key: "", label: "", placeholder: "", type: "text", value: "" },
  { key: "", label: "", placeholder: "", type: "text", value: "" },
  { key: "", label: "", placeholder: "", type: "text", value: "" },
  { key: "", label: "", placeholder: "", type: "text", value: "" },
  { key: "", label: "", placeholder: "", type: "text", value: "" },
  { key: "", label: "", placeholder: "", type: "text", value: "" },
];

export default function BasicInformation() {
  return <></>;
}
