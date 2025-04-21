import { Route, Routes } from "react-router-dom";
import { AppProvider } from "./providers/AppProvider";
import Main from "./pages/Main";
import CreateAccount from "./pages/CreateAccount";
import Suspense from "./layouts/Suspense";

function App() {
  return (
    <AppProvider>
      <Suspense>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </Suspense>
    </AppProvider>
  );
}

export default App;
