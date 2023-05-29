import React, { useState } from "react";
import { Nav } from "..";
import axios from "axios";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Spinner from "~/components/Spinner";
import { string } from "zod";
import Image from "next/image";
import { go2App } from "~/components/mainDashboard/utils/helper";
import matrixlogo from "~/components/mainDashboard/modules/assets/matrixlogo.png";
import bi from "~/components/mainDashboard/modules/assets/bi.png";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
} from "chart.js";

export interface Module_ {
  id: any;
  שם: string;
  על: string;
  עדכונים: any[];
  מוכן: boolean;
  נרכש: boolean;
}

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

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
  const graphDate = {
    labels: ["במאי 24", "25 במאי", "26 במאי", "27 במאי", "28 במאי", "29 במאי"],
    datasets: [
      {
        data: [8, 7, 2, 4, 9, 1],
        backgroundColor: "transparent",
        borderColor: "#5e59f9",
        pointBorderColor: "transparent",
        pointBorederWidth: 4,
        tension: 0.5,
      },
    ],
  };
  const options = {
    plugin: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 1,
        max: 10,
        ticks: {
          stepSize: 1,
          callback: (value: any) => value + "K",
        },
        grid: {
          borderDash: [10],
        },
      },
    },
  };

  if (data && data.error) return <h1>error...</h1>;
  return (
    <div dir="rtl" className=" h-screen w-screen overflow-auto  bg-gray-200">
      {data?.data ? (
        <div className="flex h-full w-[90%] flex-wrap items-start justify-end">
          {data.data.map((m) => m.נרכש && <InuseModule m={m} />)}{" "}
          <div className="mt-[40px] flex-col justify-center">
            <h1 className="text-center text-3xl">הודעות שנשלחו ללקוחות </h1>
            <div
              className="bottom-3 mt-[50px] mr-[80px] rounded border-blue-600"
              style={{ width: "1200px", height: "700px", marginLeft: "20px" }}
            >
              <Line data={graphDate} options={options}></Line>
            </div>{" "}
          </div>
          {data.data.map((m) => m.נרכש || <NotInuseModule m={m} />)}
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
    <div className="mt-[80px] ml-[70px] h-[300px] w-[450px] flex-row  ">
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
            <Image
              className="mr-[80px]"
              width={60}
              height={20}
              src={bi}
              alt="bi button"
            />
          </div>
        </div>
        <a
          onClick={() => go2App({ m })}
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
    <div className="mt-[80px] ml-[70px] h-[300px] w-[450px] flex-row  ">
      <div className="  h-full w-full flex-col rounded-lg border border-red-500 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
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
            <Image
              className="mr-[80px]"
              width={60}
              height={20}
              src={bi}
              alt="bi button"
            />
          </div>
        </div>
        <a
          onClick={() => go2App({ m })}
          href="#"
          className=" mt-[30px] mr-[35%] flex h-[40px] w-[120px] rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          פתח אפליקציה
        </a>
      </div>
    </div>
  );
};
