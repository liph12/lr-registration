import { Box, CircularProgress } from "@mui/material";
import Content from "./Content";
import { ReactNode } from "react";
import { useAppProvider } from "../providers/AppProvider";

export default function Suspense({ children }: { children: ReactNode }) {
  const { upline } = useAppProvider();

  return (
    <>
      {upline ? (
        <>{children}</>
      ) : (
        <Content>
          <Box
            sx={{
              height: "75vh",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <CircularProgress size={50} color="error" />
          </Box>
        </Content>
      )}
    </>
  );
}
