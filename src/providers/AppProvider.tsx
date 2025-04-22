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
import { UserAccount, CompletedSteps } from "../types";

type FieldType = string | number | boolean | null;

interface Upline {
  id: number | null;
  name: string;
  email: string;
  phone: string;
}

interface AppContextType {
  desktop: boolean;
  userAccount: UserAccount;
  upline: Upline | null;
  completedSteps: CompletedSteps;
  handleUpdateCompletedStep: <K extends keyof CompletedSteps>(
    completed: boolean,
    key: K
  ) => void;
  handleUserAccount: <K extends keyof UserAccount>(k: K, v: FieldType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const defUserAccount: UserAccount = {
  email: "",
  accountType: "",
  uplineId: null,
  verificationCode: "",
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
  const [completedSteps, setCompletedSteps] = useState<CompletedSteps>({
    basicInformation: false,
    contactsAndSocials: false,
    completeAddress: false,
    personalBackground: false,
  });

  const handleUserAccount = <K extends keyof UserAccount>(
    k: K,
    v: FieldType
  ) => {
    setUserAccount((prev) => ({
      ...prev,
      [k]: v,
    }));
  };

  const handleUpdateCompletedStep = <K extends keyof CompletedSteps>(
    completed: boolean,
    key: K
  ) => {
    setCompletedSteps((prevState) => ({
      ...prevState,
      [key]: completed,
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

          handleUserAccount("accountType", type);
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
      value={{
        desktop,
        userAccount,
        upline,
        completedSteps,
        handleUpdateCompletedStep,
        handleUserAccount,
      }}
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
