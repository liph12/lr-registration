import { Backdrop, CircularProgress, Typography } from "@mui/material";

const SuspenseOverlay = ({ open = true, text = "Loading..." }) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        color: "#fff",
        backdropFilter: "blur(5px)",
        flexDirection: "column",
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
      <Typography sx={{ mt: 2 }}>{text}</Typography>
    </Backdrop>
  );
};

export default SuspenseOverlay;
