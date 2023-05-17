import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
// import { date } from "zod";
import { OrderLine } from "~/pages/admin/[password]";

const handleSendedLines = async (
  data: OrderLine[],
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  let linesIdsToDelete: any[] = [];
  let linesToProduce: any[] = [];
  for (let i = 0; i <= data.length - 1; i++) {
    if (data[i]?.status !== "לא מויינו") {
      linesToProduce.push(data[i]);
      linesIdsToDelete.push(data[i]?.rowID);
    }
  }
  const response = await axios(
    "https://script.google.com/macros/s/AKfycbyfBt4Ueq6GAULew28xiJrl7T-dIfNDkNm1VZmAzLiD1MySjnTkP5icgtCARxNZ_wN4/exec?type=deletelinses&ids=" +
      JSON.stringify(linesIdsToDelete),
    { withCredentials: false }
  )
    .then((res) => res.data)
    .finally(() => setLoading(false));

  console.log({ response });
};

export default function Model(props: any) {
  return (
    <div
      id="pop_up"
      className={
        " fixed inset-4 flex h-full flex-col items-center justify-center bg-slate-900 bg-opacity-30 text-5xl backdrop-blur-sm"
      }
    >
      <div id="pop_up_text" className={"h-30 w-2/5 rounded bg-white p-2"}>
        <p className="text-center text-black"> הודעה חשובה</p>
        <p className="mt-4 text-center text-xs font-bold text-black">
          לחיצה על הפק תעביר את השורות הממויינות למקומם הרצויי
        </p>
        <p className="mt-1 text-center text-xs font-bold text-red-500">
          {" "}
          כל השורות שמויינו ימחקו מהממשק
        </p>
        <div className="mt-6 flex flex-row-reverse justify-center gap-20">
          <button
            onClick={() => {
              console.log("cencel");
              props.toggleModule((prev: any) => !prev);
            }}
            className="text-bold w-20 bg-gray-300 text-xl text-black"
          >
            בטל
          </button>
          <button
            onClick={() => {
              console.log("produce");
              handleSendedLines(props.data, props.setLoading);
              props.toggleModule((prev: any) => !prev);
            }}
            className="text-bold w-20 bg-red-500 text-xl text-white hover:bg-red-400 "
          >
            הפק
          </button>
        </div>
      </div>
    </div>
  );
}
