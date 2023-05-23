import axios from "axios";
// const baseDbUrl = "http://localhost:4000/"
const baseDbUrl = "https://bizmod-database-server.onrender.com/";
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
  colID?: any;
  position?: number;
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
  data: {
    orders: OrderLine[] | undefined;
    config: { headers: headerType[] | null };
  },
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
      status: "ללא",
    }));
    setOrdersData([...processdTableData]);
    setAppData && setAppData({ tableData: [...processdTableData] });

    setHeaders &&
      setHeaders(
        handleHeadersList(
          Object.keys({ ...processdTableData[0] }),
          data.config.headers
        )
      );
  }, [loading]);

  return { headers, ordersData, setOrdersData };
};

const handleHeadersList = (
  headers: string[],
  fetchedHeadersData: headerType[] | null | undefined
): headerType[] => {
  console.log({ headers, fetchedHeadersData });
  if (!fetchedHeadersData) {
    const x = headers.map(
      (h: string, index: number): headerType => ({
        initialName: h,
        replacmentName: h,
        toShow: true,
        colID: crypto.randomUUID(),
        position: index,
      })
    );
    console.log({ x });
    updateConfig(x);
    return x;
  }
  let HeadersArray: headerType[] = [];
  HeadersArray = [...fetchedHeadersData];
  let ChangesCounter = 0;
  for (let i = 0; i <= headers.length - 1; i++) {
    let isIn = false;
    for (let j = 0; j <= fetchedHeadersData.length - 1; j++) {
      if (headers[i] == fetchedHeadersData[j]?.initialName) {
        isIn = true;
      }
    }

    if (!isIn) {
      ChangesCounter += 1;
      HeadersArray.push({
        initialName: headers[i],
        replacmentName: headers[i],
        toShow: true,
        colID: crypto.randomUUID(),
        position: i,
      });
    }
  }
  console.log({ ChangesCounter, HeadersArray });
  if (ChangesCounter > 0) updateConfig(HeadersArray);
  return HeadersArray;
};

export const updateConfig = async (headersArray: headerType[]) => {
  const options = {
    url: baseDbUrl + "bizi_row/set_config",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      Date: 42314,
      userID: "123123",
      headersConfig: [...headersArray],
    },
  };

  return await axios(options)
    .then((response) => {
      console.log(response.data);
      response.data;
    })
    .catch((err) => console.log({ err }));
};

export const getConfig = async (): Promise<{
  status: boolean;
  data: { headersConfig: headerType[] };
}> => {
  const options = {
    url: baseDbUrl + "bizi_row/get_config",
    method: "POST",
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userID: "123123",
    },
  };

  return await axios(options)
    .then((response) => {
      console.log({ response });
      return response.data;
    })
    .catch((err) => console.log({ err }));
};
