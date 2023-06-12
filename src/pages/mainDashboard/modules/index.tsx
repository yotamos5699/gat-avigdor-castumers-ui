import React, { useState } from "react";
import { Nav } from "..";
import axios from "axios";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Spinner from "~/components/Spinner";
import { string } from "zod";
import Image from "next/image";
import { go2App } from "~/components/mainDashboard/utils/helper";
import matrixlogo from "~/components/mainDashboard/modules/assets/matrixlogo.png";
import graph from "~/components/mainDashboard/modules/assets/graph.jpg";
import { useRouter } from "next/router";

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
    <div dir="rtl" className="  h-screen w-screen overflow-auto  bg-gray-200">
      {data?.data ? (
        <div className="mt-24 flex h-full w-full flex-wrap items-center justify-center gap-8">
          {data.data.map((m) => m.נרכש && <InuseModule m={m} />)}{" "}
          <div className="mt-40 flex-col items-center justify-center">
            <h1 className="mb-20 text-center text-3xl">
              הודעות שנשלחו ללקוחות{" "}
            </h1>
            <Image
              className=" flex items-center"
              width={1500}
              height={1200}
              src={graph}
              alt="image graph"
            />
          </div>
          <div className="mt-12 flex h-full w-full flex-col flex-wrap items-center justify-center gap-12">
            <h1 className=" mr-24 text-5xl font-bold"> אפליקציות שלא נקנו</h1>

            {data.data.map((m) => m.נרכש || <NotInuseModule m={m} />)}
          </div>
        </div>
      ) : (
        <Spinner />
      )}

      <Nav setCurrentData={setCurrentData} currentData={currentData} />
    </div>
  );
}

export default Modules;

const userOauth = () => "/123";

const InuseModule = ({ m }: { m: Module_ }) => {
  const { push } = useRouter();
  return (
    <div className={"mt-10 max-w-[90%]"}>
      <div className="  h-full w-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="  flex items-center">
          <Image width={70} height={70} src={matrixlogo} alt="image logo" />

          <a href="#">
            <h5 className="mb-2 mr-2 mt-1 text-2xl font-bold  text-gray-900 dark:text-white">
              אפליקציית {m.שם}
            </h5>
          </a>
        </div>
        <div className=" mr-6 ">
          <h5 className=" text-sm font-normal">הודעות ועדכונים</h5>
          <div className=" flex items-center">
            <div className="mt-2 h-[80px] w-[200px] flex-row  rounded-md border-[1px] border-gray-200  ">
              <p className="mt-2  text-xs font-thin text-gray-700  dark:text-gray-400">
                {m.עדכונים}
              </p>
            </div>
            <a
              href="#"
              className=" mr-9  flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              BI{" "}
            </a>
          </div>
        </div>
        <a
          onClick={() => {
            const res = go2App({ m });
            res && push(res + userOauth());
          }}
          href="#"
          className=" mt-[30px] mr-[35%] flex h-[40px] w-[120px] rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          פתח אפליקציה
        </a>
      </div>
    </div>
  );
};

const NotInuseModule = ({ m }: { m: Module_ }) => {
  return (
    <div className={"max-w-[90%] flex-row"}>
      <div className="  h-full w-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="  flex items-center">
          <Image width={70} height={70} src={matrixlogo} alt="image logo" />

          <a href="#">
            <h5 className="mb-2 mr-2 mt-1 text-2xl font-bold  text-gray-900 dark:text-white">
              אפליקציית {m.שם}
            </h5>
          </a>
        </div>
        <div className=" mr-6 ">
          <h5 className=" text-sm font-normal"> על החבילה:</h5>
          <div className=" flex items-center">
            <div className="mt-2 h-[80px] w-[200px] flex-row  rounded-md border-[1px] border-gray-200  ">
              <p className="mt-2  text-xs font-thin text-gray-700  dark:text-gray-400"></p>
            </div>
          </div>
        </div>
        <a
          onClick={() => go2App({ m })}
          href="#"
          className=" mt-[30px] mr-[35%] flex h-[60px] w-[120px] rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          להוספת החבילה
        </a>
      </div>
    </div>
  );
};

// git fetch upstream/main
// git rebase upstream/main
