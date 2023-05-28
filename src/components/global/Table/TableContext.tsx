import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { getTableData } from "./TableWaraper";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

interface Tdata {
  Headers: string[] | null;
  CellsData: any[][] | null;
  Length: number | null;
}
const initialTdata = { Headers: null, CellsData: null, Length: null };

export const useTableData = () => useContext(TableDataContext);
export const useTableUpdate = () => useContext(TableDataUpdate);

export const TableDataContext = createContext<{
  TableData: Tdata;
  initiateTable: (data: any[]) => void;
}>({ TableData: initialTdata, initiateTable: ([]) => undefined });
export const TableDataUpdate = createContext<Dispatch<SetStateAction<Tdata>>>(
  () => undefined
);
export const TableDataContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [TableData, setTableData] = useState<Tdata>(initialTdata);
  const initiateTable = (data: any[]) => {
    const formatedTableData = getTableData(data);
    setTableData(formatedTableData ?? initialTdata);
  };

  return (
    <TableDataContext.Provider value={{ TableData, initiateTable }}>
      <TableDataUpdate.Provider value={setTableData}>
        {children}
      </TableDataUpdate.Provider>
    </TableDataContext.Provider>
  );
};
