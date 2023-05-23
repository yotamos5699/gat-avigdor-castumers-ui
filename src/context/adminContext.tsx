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
export const status2global_check = {
  למחוק: "delete",
  במטריצה: "matrix",
  ללא: "reset",
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
  globalChecking: {
    matrix: boolean;
    delete: boolean;
    reset: boolean;
  };
  setGlobalChecking:
    | Dispatch<
        SetStateAction<{
          matrix: boolean;
          delete: boolean;
          reset: boolean;
        }>
      >
    | undefined;
  statusCounter: {
    למחוק: number;
    במטריצה: number;
    ללא: number;
    global: number;
  };
  setStatusCounter:
    | Dispatch<
        SetStateAction<{
          למחוק: number;
          במטריצה: number;
          ללא: number;
          global: number;
        }>
      >
    | undefined;
  renderdScreen: string;
  setRenderdScreen: Dispatch<SetStateAction<string>> | undefined;
}>({
  appData: undefined,
  setAppData: undefined,
  menuState: undefined,
  setMenuState: undefined,
  headers: null,
  setHeaders: undefined,
  viewType: "ללא",
  setViewType: undefined,
  globalChecking: { delete: false, matrix: false, reset: true },
  setGlobalChecking: undefined,
  statusCounter: { ללא: 0, global: 0, במטריצה: 0, למחוק: 0 },
  setStatusCounter: undefined,
  renderdScreen: "admin",
  setRenderdScreen: undefined,
});

export const AdminDataContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [appData, setAppData] = useState<any | undefined>();
  const [viewType, setViewType] = useState("ללא");
  const [renderdScreen, setRenderdScreen] = useState("admin");
  // const [appData, setAppData] = useLocalStorage("app_data", null);
  const [menuState, setMenuState] = useState();
  const [headers, setHeaders] = useState<headerType[] | null>(null);
  const [globalChecking, setGlobalChecking] = useState({
    matrix: false,
    delete: false,
    reset: false,
  });

  const [statusCounter, setStatusCounter] = useState({
    למחוק: 0,
    במטריצה: 0,
    ללא: 0,
    global: 0,
  });
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
        globalChecking,
        setGlobalChecking,
        statusCounter,
        setStatusCounter,
        renderdScreen,
        setRenderdScreen,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};
