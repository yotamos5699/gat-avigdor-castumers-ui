import axios from "axios";
import Model from "../../components/Module";
import { type } from "os";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatDate } from "~/utils/helper";
import Spinner from "~/components/Spinner";

export async function getServerSideProps(context: any) {
  const { params } = context;
  if (params.password == "123") {
    const response = await axios(
      "https://script.google.com/macros/s/AKfycbyfBt4Ueq6GAULew28xiJrl7T-dIfNDkNm1VZmAzLiD1MySjnTkP5icgtCARxNZ_wN4/exec?type=orders",
      { withCredentials: false }
    ).then((res) => res.data);

    return {
      props: {
        data: response,
      },
    };
  }
}

export const AdminData = ({ data }: { data: any }) => {
  const [viewType, setViewType] = useState("לא מויינו");
  const [produceModule, togleProduceModule] = useState(false);

  const [loading, setLoading] = useState(false);
  const { headers, ordersData, setOrdersData } = useAdminData(data, loading);
  // useEffect(() => {}, [adminData, headers]);

  const handleClick = (e: any, lineID: any, type: string, from?: string) => {
    if (from && from == "row")
      setOrdersData((prev) =>
        prev?.map((line) =>
          line.rowID == lineID ? { ...line, status: type } : line
        )
      );
  };

  useEffect(() => {
    console.log({ headers, ordersData });
  }, [headers, ordersData]);
  return (
    <div className={" flex flex-col items-center justify-center"}>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="mb-8 flex flex-row-reverse gap-14">
            <p className=" text-xl ">הזמנות שנכנסו</p>
            <div className="flex gap-1">
              <button
                onClick={() => setViewType("במטריצה")}
                className="text-bold w-20 bg-green-400 text-black"
              >
                במטריצה
              </button>
              <button
                onClick={() => setViewType("למחוק")}
                className="w-20 bg-red-400"
              >
                {" "}
                למחוק
              </button>
              <button
                onClick={() => setViewType("לא מויינו")}
                className="text-bold w-20 bg-blue-300 text-black"
              >
                {" "}
                לא מויינו
              </button>
              <button
                onClick={() => setViewType("הכל")}
                className="text-bold w-20 bg-gray-200 text-black"
              >
                {" "}
                הכל
              </button>
            </div>
            <button
              onClick={() => {
                togleProduceModule(true);
              }}
              className="flex w-20 justify-center bg-pink-300 text-center text-black hover:bg-red-500 hover:text-white"
            >
              הפק
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
              <button className="w-1/6 bg-red-400 text-[8px]">למחוק</button>
            </div>
          )}
          <TableData
            data={ordersData}
            handleClick={handleClick}
            type={viewType}
          />

          {produceModule && (
            <Model
              toggleModule={togleProduceModule}
              data={ordersData}
              setLoading={setLoading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AdminData;
const TableData = (props: any) => {
  return (
    <>
      {props.data &&
        props.data.map((row: any, index: number) => {
          if (props.type == "הכל")
            return <Row row={row} handleClick={props.handleClick} />;
          if (props.type == row.status) {
            return <Row row={row} handleClick={props.handleClick} />;
          }
        })}
    </>
  );
};
interface Row {
  row: OrderLine;
  handleClick: (e: any, lineID: any, type: string, from: string) => void;
}

const Row = ({ row, handleClick }: Row) => {
  return (
    <div className="flex w-full flex-row-reverse  ">
      {Object.values(row).map((cell: any, index: number) => {
        if (index != 0 && index != 2)
          return <p className="w-1/6 text-[8px]">{cell}</p>;
        // else return <p className="w-1/6 text-center text-[8px]"> {cell}</p>;
      })}
      {row.status != "במטריצה" && (
        <button
          onClick={(e) => handleClick(e, row.rowID, "במטריצה", "row")}
          className="w-1/6 bg-green-400 text-[8px] font-bold text-black"
        >
          למטריצה
        </button>
      )}
      {row.status != "למחוק" && (
        <button
          onClick={(e) => handleClick(e, row.rowID, "למחוק", "row")}
          className="w-1/6 bg-red-400 text-[8px]"
        >
          למחוק
        </button>
      )}
      {row.status != "לא מויינו" && (
        <button
          onClick={(e) => handleClick(e, row.rowID, "לא מויינו", "row")}
          className="w-1/6 bg-blue-300 text-[8px] font-bold  text-gray-700"
        >
          איפוס
        </button>
      )}
    </div>
  );
};

export interface OrderLine {
  rowID: string | number;
  date: string;
  actionID: string | number;
  castumer_name: string;
  castumer_ID: string | number;
  phone: string;
  product_name: string;
  product_ID: string;
  amount: number;
  delivery_time: string;
  castumer_type: string;
  measuring_unit: string;
  type?: string;
  status?: string;
}

const useAdminData = (
  OrdersData: OrderLine[] | undefined,
  loading: boolean
): {
  headers: string[] | undefined;
  ordersData: OrderLine[] | undefined;
  setOrdersData: Dispatch<SetStateAction<OrderLine[] | undefined>>;
} => {
  const [ordersData, setOrdersData] = useState<OrderLine[] | undefined>();
  const [returnsData, setReturnsData] = useState<OrderLine[] | undefined>();
  const [headers, setHeaders] = useState<string[] | undefined>();
  const f = formatDate();
  useEffect(() => {
    console.log({ OrdersData });
    if (!OrdersData || loading) return;
    const ordersTableData = OrdersData.slice(1, OrdersData.length - 1);
    const processdTableData = ordersTableData.map((row: OrderLine) => ({
      ...row,
      date: f.format(new Date(row.date)),
      delivery_time: f.format(new Date(row.delivery_time)),
      type: "הזמנות",
      status: "לא מויינו",
    }));
    setOrdersData([...processdTableData]);
    setHeaders(Object.keys({ ...processdTableData[0] }) ?? [""]);
  }, [loading]);

  return { headers, ordersData, setOrdersData };
};
