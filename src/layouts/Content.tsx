import { ReactNode } from "react";
import { Container, Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import mainBg from "../assets/main-bg.png";

interface ContentProps {
  children: ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <Box
      sx={{
        width: "auto",
        height: "100vh",
        backgroundImage: `url(${mainBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <Container sx={{ py: 4 }}>{children}</Container>
      <Footer />
    </Box>
  );
}
