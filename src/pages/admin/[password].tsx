import axios from "axios";
import { type } from "os";
import { useEffect, useState } from "react";

export async function getServerSideProps(context: any) {
  const { params } = context;
  if (params.password == "123") {
    const response = await axios(
      "https://script.google.com/macros/s/AKfycbyfBt4Ueq6GAULew28xiJrl7T-dIfNDkNm1VZmAzLiD1MySjnTkP5icgtCARxNZ_wN4/exec?type=admin",
      { withCredentials: false }
    ).then((res) => res.data);

    return {
      props: {
        data: response,
      },
    };
  }
}
const f = Intl.DateTimeFormat("he-IL", {
  dateStyle: "short",
});
const formatDate = (date: string) => {
  console.log({ date });
  return f.format(new Date(date));
};

export const AdminData = ({ data }: { data: any }) => {
  const [adminData, setAdminData] = useState<any[]>();
  const [viewType, setViewType] = useState("לא מויינו");
  const [headers, setHeaders] = useState<string[] | undefined>();

  useEffect(() => {
    const d = data.slice(1, data.length - 1);
    const a = d.map((row: any) => [...row, { matrix: false, drop: false }]);
    setAdminData([...a]);
    setHeaders(data[0]);
  }, []);

  useEffect(() => {}, [adminData, headers]);

  const handleClick = (e: Event, row: any[], index: number, type: string) => {
    if (type == "matrix") {
      setAdminData((prev) =>
        prev?.map((row: any[], Index: number) => {
          if (index == Index) {
            row[row.length - 1] = { matrix: true, drop: false };
          }

          return row;
        })
      );
    }
    if (type == "drop") {
      setAdminData((prev) =>
        prev?.map((row: any[], Index: number) => {
          if (index == Index) {
            row[row.length - 1] = { matrix: false, drop: true };
          }
          return row;
        })
      );
    }
  };
  return (
    <div className={" flex flex-col items-center justify-center"}>
      <div className="mb-8 flex flex-row-reverse gap-6">
        <p className=" text-xl ">הזמנות שנכנסו</p>

        <button
          onClick={() => setViewType("במטריצה")}
          className="text-bold w-20 bg-green-400 text-black"
        >
          במטריצה
        </button>
        <button onClick={() => setViewType("בפח")} className="w-20 bg-red-400">
          {" "}
          בפח
        </button>
        <button
          onClick={() => setViewType("לא מויינו")}
          className="text-bold w-20 bg-gray-200 text-black"
        >
          {" "}
          לא מויינו
        </button>
      </div>
      {headers && (
        <div className="mb-4 flex w-full  flex-row-reverse justify-center">
          {headers.map((cell: any, index: number) => {
            if (index !== 0 && index !== 2)
              return <p className="w-1/6 text-center text-[8px]">{cell}</p>;
          })}
          <button className="w-1/6 bg-green-400 text-[8px] font-bold text-black">
            למטריצה
          </button>
          <button className="w-1/6 bg-red-400 text-[8px]">לזרוק</button>
        </div>
      )}
      <TableData data={adminData} handleClick={handleClick} type={viewType} />
    </div>
  );
};

export default AdminData;
const TableData = (props: any) => {
  return (
    <>
      {props.data &&
        props.data.map((row: any[], index: number) => {
          if (props.type == "לא מויינו") {
            if (
              row[row.length - 1].matrix == false &&
              row[row.length - 1].drop == false
            )
              return (
                <Row index={index} row={row} handleClick={props.handleClick} />
              );
          }
          if (props.type == "בפח") {
            if (
              row[row.length - 1].matrix == false &&
              row[row.length - 1].drop == true
            )
              return (
                <Row index={index} row={row} handleClick={props.handleClick} />
              );
          }
          if (props.type == "במטריצה") {
            if (
              row[row.length - 1].matrix == true &&
              row[row.length - 1].drop == false
            )
              return (
                <Row index={index} row={row} handleClick={props.handleClick} />
              );
          }
        })}
    </>
  );
};

const Row = (props: any) => {
  return (
    <div className="flex w-full flex-row-reverse  ">
      {props.row.map((cell: any, index: number) => {
        if (index !== 0 && index !== 2 && index != props.row.length - 1) {
          if (index == 1 || index == 9)
            return <p className="w-1/6 text-[8px]">{formatDate(cell)}</p>;
          else return <p className="w-1/6 text-center text-[8px]"> {cell}</p>;
        }
      })}
      <button
        onClick={(e) => props.handleClick(e, props.row, props.index, "matrix")}
        className="w-1/6 bg-green-400 text-[8px] font-bold text-black"
      >
        למטריצה
      </button>
      <button
        onClick={(e) => props.handleClick(e, props.row, props.index, "drop")}
        className="w-1/6 bg-red-400 text-[8px]"
      >
        לזרוק
      </button>
    </div>
  );
};
