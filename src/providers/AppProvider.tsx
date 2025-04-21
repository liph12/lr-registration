import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import useAxios from "../hooks/useAxios";

type FieldType = string | number | boolean;

interface Upline {
  id: number | null;
  name: string;
  email: string;
  phone: string;
}

interface UserAccount {
  email: string;
  accountType: string;
  uplineId: number | null;
  verificationCode: string | null;
  agreed: boolean;
  fullURL: string;
}

interface AppContextType {
  desktop: boolean;
  userAccount: UserAccount;
  upline: Upline | null;
  handleUserAccount: (k: string, v: FieldType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const defUserAccount: UserAccount = {
  email: "",
  accountType: "",
  uplineId: null,
  verificationCode: null,
  agreed: false,
  fullURL: window.location.href,
};

const AppProvider = ({ children }: AppProviderProps) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const appTheme = createTheme({
    typography: {
      fontFamily: [
        "Geist",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });
  const axiosInstance = useAxios();
  const [upline, setUpline] = useState<Upline | null>(null);
  const [userAccount, setUserAccount] = useState(defUserAccount);

  const handleUserAccount = (k: string, v: FieldType) => {
    setUserAccount((prev) => ({
      ...prev,
      [k]: v,
    }));
  };

  useEffect(() => {
    const getUpline = async () => {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const ref = urlParams.get("ref");
        const type = urlParams.get("type");

        if (ref) {
          const response = await axiosInstance.get(`referrer/${ref}`);
          const uplineData = response.data;
          const uplineName = uplineData.name;
          const { email, phone, id } = uplineData.details;

          setUpline({
            id: id,
            email: email,
            phone: phone,
            name: uplineName,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    getUpline();
  }, []);

  return (
    <AppContext.Provider
      value={{ desktop, userAccount, upline, handleUserAccount }}
    >
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

const useAppProvider = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppProvider must be used within a AppProvider");
  }
  return context;
};

export { AppProvider, useAppProvider };
