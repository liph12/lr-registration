import React from "react";
import { Box, TextField, Typography, TextFieldProps } from "@mui/material";
import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";

interface CustomTextFieldProps {
  props?: TextFieldProps;
  params?: AutocompleteRenderInputParams;
  type?: string;
  value: string;
  placeholder: string;
  name: string;
  error?: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomTextField({
  props,
  params,
  type = "text",
  value,
  placeholder,
  name,
  error = null,
  handleChange,
}: CustomTextFieldProps) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(209, 209, 209, 0.5)",
          display: "flex",
          border: error ? "1px solid #d32f2f" : "none",
        }}
      >
        <TextField
          {...params}
          {...props}
          fullWidth
          autoComplete="off"
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                mr: 1,
                border: "none",
              },
            },
          }}
        />
      </Box>
      {error && (
        <Typography variant="caption" component="div" color="error">
          {error}
        </Typography>
      )}
    </>
  );
}
