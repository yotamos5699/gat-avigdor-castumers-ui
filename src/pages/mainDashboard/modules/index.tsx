import React, { useState } from "react";
import { Nav } from "..";
import axios from "axios";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Spinner from "~/components/Spinner";
import { string } from "zod";
import Image from "next/image";
import { go2App } from "~/components/mainDashboard/utils/helper";
import matrixlogo from "~/components/mainDashboard/modules/assets/matrixlogo.png";

export interface Module_ {
  id: any;
  שם: string;
  על: string;
  עדכונים: any[];
  מוכן: boolean;
  נרכש: boolean;
}
const getModulesData = async (): Promise<Module_[]> =>
  await axios
    .get(
      "https://script.google.com/macros/s/AKfycbxyX9_vHXG1uQbTNA-F9-07pq8rhZpaJ99KOzUNHgQ3cGmz8akUumgaJGMC6y7TuLZe/exec"
    )
    .then((res) => res.data)
    .catch((error) => console.log({ error }));

function Modules() {
  const [currentData, setCurrentData] = useState<string>("modules");
  const data = useQuery({
    queryKey: ["MODULES"],
    queryFn: getModulesData,
  });

  if (data && data.error) return <h1>error...</h1>;
  return (
    <div dir="rtl" className=" h-screen w-screen overflow-auto  bg-gray-200">
      {data?.data ? (
        <div className="flex h-full w-[90%] flex-wrap items-start justify-end">
          {data.data.map((m) => m.נרכש && <InuseModule m={m} />)}
        </div>
      ) : (
        <Spinner />
      )}

      <Nav setCurrentData={setCurrentData} currentData={currentData} />
    </div>
  );
}

export default Modules;

const InuseModule = ({ m }: { m: Module_ }) => {
  return (
    <div className="mt-[100px] ml-[50px] h-[350px] w-[400px] flex-row ">
      <div className="  h-full w-full flex-col justify-end rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <div className=" group flex items-center justify-end">
          <Image width={70} height={70} src={matrixlogo} alt="image logo" />

          <a href="#">
            <h5 className="mb-2  text-2xl font-bold  text-gray-900 dark:text-white">
              אפליקציית {m.שם}
            </h5>
          </a>
        </div>
        <div className="group mr-6 flex-col">
          <h5 className="text-right font-bold">:הודעות</h5>
          <div className="group flex h-[80px] w-[150px]  justify-self-end rounded-md border-[1px] border-gray-200  ">
            <p className="mb-3 text-right text-xs font-thin text-gray-700 rtl:mr-3 dark:text-gray-400">
              {m.עדכונים}
            </p>
          </div>
        </div>
        <a
          onClick={() => go2App({ m })}
          href="#"
          className="ml-[30px] mt-[50px] mr-[25%] flex h-[40px] w-[120px] rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          פתח אפליקציה
        </a>
      </div>
    </div>
  );
};

const NotInuseModule = ({ m }: { m: Module_ }) => {
  return <h1 className="border-2 border-red-400"> {m.שם}</h1>;
};
