import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AuthShowcase } from "..";
import { FaTasks } from "react-icons/fa";
import Actions from "~/components/mainDashboard/actions";
import mD from "../../constants/jsonData/MOCK_DATA.json";
import {
  TableDataContextProvider,
  useTableData,
} from "~/components/global/Table/TableContext";
import { HeadersDiv, TableRows } from "~/components/global/Table/TableWaraper";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";

function MainDashboard() {
  const [currentData, setCurrentData] = useState<string>("home");
  const { push } = useRouter();
  useEffect(() => {
    if (currentData == "modules") push("mainDashboard/modules");
  }, [currentData]);

  return (
    <div className="flex h-screen w-full justify-center ">
      <main className="relative flex min-h-screen w-[98%] flex-col">
        <Nav setCurrentData={setCurrentData} currentData={currentData} />
        {currentData == "table" && (
          <TableDataContextProvider>
            <Table />
          </TableDataContextProvider>
        )}
      </main>
    </div>
  );
}

const Table = () => {
  const { initiateTable, TableData } = useTableData();
  useEffect(() => {
    initiateTable(mD);
  }, []);
  useEffect(() => {
    console.log({ TableData });
  }, [TableData]);
  return (
    <div className={`static  mt-28  h-screen `}>
      <HeadersDiv Headers={TableData.Headers} />
      <TableRows Rows={TableData.CellsData} />
    </div>
  );
};

export default MainDashboard;

export const Nav = ({
  setCurrentData,
  currentData,
}: {
  setCurrentData: React.Dispatch<React.SetStateAction<string>>;
  currentData: string;
}) => {
  const { push } = useRouter();
  return (
    <div className="fixed top-0 z-50 flex h-12 w-full flex-row-reverse justify-between rounded-sm bg-base-100 shadow-lg  shadow-gray-600">
      <div className="navbar-start w-auto ">
        <div className="dropdown ">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact absolute right-0 mt-1 w-24 items-center  bg-base-100 text-center shadow"
          >
            <li>
              <a className="text-center">תשלומים</a>
            </li>
            <li>
              <a className="text-center">תצוגה</a>
            </li>
            <li>
              <a className="text-center">משימות</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center flex items-center gap-4">
        {currentData == "home" && (
          <>
            <FaTasks
              onClick={() => setCurrentData("table")}
              className="btn-ghost"
              size={20}
            />
            <a className="btn-ghost" onClick={() => setCurrentData("modules")}>
              מודולים
            </a>
          </>
        )}
        {currentData != "home" && (
          <AiOutlineHome
            onClick={() => {
              setCurrentData("home");
              push("/mainDashboard");
            }}
            className=" text-blue-300"
            size={"20px"}
          />
        )}
      </div>
      <div className="flex">
        <Actions />
        <button className="btn-ghost btn-circle btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn-ghost btn-circle btn">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge-primary badge badge-xs indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};
