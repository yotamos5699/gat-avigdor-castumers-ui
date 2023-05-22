import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { headerType } from "~/hooks/admin/helper";
import useLocalStorage from "~/hooks/useLocalStorage";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const AdminDataContext = createContext<{
  appData: any;
  setAppData: Dispatch<SetStateAction<any>> | undefined;
  menuState: any;
  setMenuState: Dispatch<SetStateAction<any>> | undefined;
  headers: headerType[] | null;
  setHeaders: Dispatch<SetStateAction<headerType[] | null>> | undefined;
  viewType: string;
  setViewType: Dispatch<SetStateAction<string>> | undefined;
}>({
  appData: undefined,
  setAppData: undefined,
  menuState: undefined,
  setMenuState: undefined,
  headers: null,
  setHeaders: undefined,
  viewType: "לא מויינו",
  setViewType: undefined,
});

export const AdminDataContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [appData, setAppData] = useState<any | undefined>();
  const [viewType, setViewType] = useState("לא מויינו");
  // const [appData, setAppData] = useLocalStorage("app_data", null);
  const [menuState, setMenuState] = useState();
  const [headers, setHeaders] = useState<headerType[] | null>(null);
  useEffect(() => {
    console.log({ headers, appData });
  }, [headers, appData]);

  return (
    <AdminDataContext.Provider
      value={{
        appData,
        setAppData,
        menuState,
        setMenuState,
        headers,
        setHeaders,
        viewType,
        setViewType,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};
