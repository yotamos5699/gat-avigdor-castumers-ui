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

export interface headerType {
  initialName?: string | undefined;
  replacmentName?: string | null;
  toShow?: boolean;
}

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AdminDataContext } from "~/context/adminContext";
import { formatDate } from "~/utils/helper";

export const useAdminData = (
  data: { orders: OrderLine[] | undefined; headers: headerType[] | null },
  loading: boolean
): {
  headers: headerType[] | null;
  ordersData: OrderLine[] | undefined;
  setOrdersData: Dispatch<SetStateAction<OrderLine[] | undefined>>;
} => {
  const [ordersData, setOrdersData] = useState<OrderLine[] | undefined>();
  const { setAppData } = useContext(AdminDataContext);
  const { headers, setHeaders } = useContext(AdminDataContext);
  //   const [headers, setHeaders] = useState<headerType[] | null>(null);
  const f = formatDate();
  useEffect(() => {
    console.log({ data });
    if (!data.orders || loading) return;
    const ordersTableData = data.orders.slice(1, data.orders.length - 1);
    const processdTableData = ordersTableData.map((row: OrderLine) => ({
      ...row,
      date: f.format(new Date(row.date)),
      delivery_time: f.format(new Date(row.delivery_time)),
      type: "הזמנות",
      status: "לא מויינו",
    }));
    setOrdersData([...processdTableData]);
    setAppData && setAppData({ tableData: [...processdTableData] });

    setHeaders &&
      setHeaders(
        handleHeadersList(
          Object.keys({ ...processdTableData[0] }),
          data.headers
        )
      );
  }, [loading]);

  return { headers, ordersData, setOrdersData };
};

const updateConfig = async (headersArray: headerType[]) => {
  const axios = require("axios");
  let data = JSON.stringify({
    Date: 42314,
    userID: "123123",
    headersConfig: [...headersArray],
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "localhost:4000/bizi_row/set_config",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response: { data: { status: boolean; data: any } }) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleHeadersList = (
  headers: string[],
  fetchedHeadersData: headerType[] | null | undefined
): headerType[] => {
  console.log({ headers, fetchedHeadersData });
  if (!fetchedHeadersData) {
    console.log("passed the if");
    const x = headers.map((h: string) => ({
      initialName: h,
      replacmentName: h,
      toShow: true,
    }));
    console.log({ x });
    return x;
  }
  let HeadersArray: headerType[] = [];
  let ChangesCounter = 0;
  for (let i = 0; i <= headers.length - 1; i++) {
    let isIn = false;
    for (let j = 0; j <= fetchedHeadersData.length - 1; j++) {
      if (headers[i] == fetchedHeadersData[j]?.initialName) {
        ChangesCounter += 1;
        isIn = true;
        HeadersArray.push({ ...fetchedHeadersData[j] });
      }
      if (!isIn) {
        HeadersArray.push({
          initialName: headers[i],
          replacmentName: headers[i],
          toShow: true,
        });
      }
    }
  }
  console.log({ HeadersArray });
  if (ChangesCounter > 0) updateConfig(HeadersArray);
  return HeadersArray;
};
