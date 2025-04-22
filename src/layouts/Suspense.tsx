import Content from "./Content";
import { ReactNode } from "react";
import { useAppProvider } from "../providers/AppProvider";
import SuspenseOverlay from "./SuspenseOverlay";

export default function Suspense({ children }: { children: ReactNode }) {
  const { upline } = useAppProvider();

  return (
    <>
      {upline ? (
        <>{children}</>
      ) : (
        <Content>
          <SuspenseOverlay />
        </Content>
      )}
    </>
  );
}
