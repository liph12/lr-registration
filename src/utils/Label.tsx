import { Typography } from "@mui/material";

interface LabelProps {
  title: string;
  required?: boolean;
}

export default function Label({ title, required = true }: LabelProps) {
  return (
    <Typography component="div">
      {title}{" "}
      {required && (
        <Typography component="span" color="error">
          *
        </Typography>
      )}
    </Typography>
  );
}
