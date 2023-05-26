import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AuthShowcase } from "..";
import { FaTasks } from "react-icons/fa";
import Actions from "~/components/mainDashboard/actions";
import mD from "../../../MOCK_DATA.json";
function MainDashboard() {
  const { data: sessionData } = useSession();
  const [currentData, setCurrentData] = useState<string | null>(null);
  return (
    <div className="mt-16 flex h-screen justify-center ">
      <main className="relative  flex min-h-[90%] w-[90%] flex-col items-center  justify-center rounded-md bg-gradient-to-b from-[#3e1479] to-[#1f203d] shadow-lg shadow-[#7a5ba5]">
        <Nav setCurrentData={setCurrentData} />

        {currentData == "table" && <Table />}
        {/* <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">dashBoard</span> Mode
          </h1> */}
      </main>
    </div>
  );
}

export default MainDashboard;

const Nav = ({
  setCurrentData,
}: {
  setCurrentData: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <div className="absolute top-0 z-50 flex w-full flex-row-reverse justify-between rounded-sm bg-base-100 shadow-lg  shadow-gray-600">
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
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>תשלומים</a>
            </li>
            <li>
              <a>תצוגה</a>
            </li>
            <li>
              <a>משימות</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center flex items-center gap-4">
        <FaTasks
          onClick={() => setCurrentData("table")}
          className="btn-ghost"
          size={20}
        />
        <a className="">מודולים</a>
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
const L = mD[0] ? Object.values(mD[0]).length - 1 : 0;
const Table = () => {
  console.log({ L });
  return (
    <div className="mt-14 table-auto overflow-x-auto scroll-auto">
      <table className=" flex w-full flex-col">
        <thead>
          <tr className=" sticky top-0">
            {mD[0] &&
              Object.keys(mD[0])
                .reverse()
                .map((h) => <th className="text-center">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {mD && (
            <div>
              {mD.map((row) => (
                <tr>
                  {Object.values(row)
                    .reverse()
                    .map((cell, i) => {
                      if (row.סיווג == "קריטי" && !row.בוצע) {
                        if (i > 0)
                          return <td className="text-center">{cell}</td>;
                        else if (typeof cell == "boolean")
                          return (
                            <td>
                              <input
                                // className="bg-slate-100"
                                type="checkbox"
                                checked={cell}
                              />
                            </td>
                          );
                      }
                    })}
                </tr>
              ))}
            </div>
          )}
          {mD && (
            <div>
              {mD.map((row) => (
                <tr>
                  {Object.values(row)
                    .reverse()
                    .map((cell, i) => {
                      if (row.סיווג != "קריטי") {
                        if (i > 0)
                          return <td className="text-center">{cell}</td>;
                        else if (typeof cell == "boolean")
                          return (
                            <td>
                              <input
                                // className="bg-slate-100"
                                type="checkbox"
                                checked={cell}
                              />
                            </td>
                          );
                      }
                    })}
                </tr>
              ))}
            </div>
          )}
        </tbody>
        <tfoot>
          <tr>
            {mD[0] &&
              Object.keys(mD[0])
                .reverse()
                .map((h) => <th className="text-center">{h}</th>)}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
