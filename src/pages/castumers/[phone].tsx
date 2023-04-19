import axios from "axios";
import { create } from "domain";
import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "~/components/Spinner";
import useDebouncs from "~/hooks/useDebouncs";

// # fix limit problem
// # after order send clock entery to spesific castumer
// # make not allowed screen
// # update order in google sheet

export const getUserByPhone = ({ data }: { data: any }) => {
  const [date, setDate] = useState<string | undefined>();
  const [Products, setProducts] = useState<any[]>();
  const [uuser, setUser] = useState(() => data.data.user);
  const [orderd, setOrderd] = useState(false);
  const [loading, setLoading] = useState(false);
  const editProductAmount = (name: string, id: any, value?: any) => {
    let newProductsArray: any[] = [];
    if (!Products) return;

    if (name == "input") {
      console.log("in input mode...", value, typeof value);
      newProductsArray = Products?.map((p) =>
        p.id == id ? { ...p, amount: parseInt(value) } : p
      );
    } else {
      const sum = name == "add" ? 1 : -1;
      newProductsArray = Products?.map((p) =>
        p.id == id
          ? { ...p, amount: p.amount + sum > 0 ? p.amount + sum : 0 }
          : p
      );
    }
    newProductsArray &&
      setProducts([...newProductsArray.sort((a, b) => b.amount - a.amount)]);
    console.log({ newProductsArray });
    // setProducts();
  };
  useEffect(() => {
    if (!Products) {
      console.log("initializing products...");
      let newArray: any[] = [];
      data.data.products.forEach((p: any) =>
        newArray.push({ ...p, amount: 0 })
      );
      setProducts([...newArray]);
    }
  }, []);

  const createOrder = async () => {
    setLoading(true);

    if (!Products) return;
    const now = new Date();
    const rowID = Math.floor(Math.random() * 1000000);
    const User = data.data.user;
    const castumer = [now, rowID, User.name, User.key, User.phone];
    for (let i = 0; i <= Products?.length - 1; i++) {
      if (Products[i].amount == 0) continue;
      let row = [
        ...castumer,
        Products[i].name,
        Products[i].key,
        Products[i].amount,
        date ?? now,
        User.pro ? "סיטונאי" : "רגיל",
        User.pro ? "קילו" : "יחידות",
      ];
      await userData(JSON.stringify(row), "type=setorder&row=");
    }
    userData(User.key, "type=setorderstatus&id=");
    setLoading(false);
    setOrderd(true);
  };
  console.log("data.data.user", data.data.user);
  return (
    <div>
      {data?.data?.user?.orderd ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <p className="text-3xl">הזמנה כבר בוצעה הקישור לא פעיל יותר...</p>
        </div>
      ) : loading ? (
        <Spinner />
      ) : !orderd ? (
        <div dir="rtl" className="h-screen">
          <div className="mb-4 mt-1 flex justify-center gap-2">
            <div className="mr-4 flex max-w-xs  gap-4  rounded-xl bg-white/10 p-4 font-bold text-white hover:bg-white/20">
              <p> שלום </p>
              <p>{data.data?.user?.name}</p>
            </div>
            <a
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-green-600"
              onClick={() => {
                createOrder();
              }}
              // href="https://create.t3.gg/en/usage/first-steps"
              // target="_blank"
            >
              <h3 className=" font-bold">שלח הזמנה →</h3>
            </a>
            {uuser?.pro && (
              <div>
                <div className="flex flex-col">
                  <p>תאריך הזמנה</p>
                  <input
                    onChange={(e) => setDate(e.target.value)}
                    type={"datetime-local"}
                    className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-green-600"
                  />
                </div>
              </div>
            )}
            {uuser?.pro && (
              <p className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-green-600">
                יחידת מידה קילו
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {Products?.map((product: any) => (
              <Product
                product={product}
                editProductAmount={editProductAmount}
              />
            ))}
          </div>
          {/* <div>{JSON.stringify(data)}</div>{" "} */}
        </div>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center">
          <p className="text-3xl">ההזמנה נקלטה בהצלחה </p>
        </div>
      )}
    </div>
  );
};

export default getUserByPhone;

const BaseUrl =
  "https://script.google.com/macros/s/AKfycbyfBt4Ueq6GAULew28xiJrl7T-dIfNDkNm1VZmAzLiD1MySjnTkP5icgtCARxNZ_wN4/exec?";

export const userData = async (data: any, rout: string) => {
  console.log("in user data function: ", { data });
  return await axios
    .get(BaseUrl + rout + data, { withCredentials: false })
    .then((res) => {
      const data = res.data;
      console.log({ data });
      return data;
    })
    .catch((e) => console.log);
};

// export const setOrderApi = async (row: string) => {
//   return await axios
//     .get(BaseUrl + "type=setorder&row=" + row, { withCredentials: false })
//     .then((res) => {
//       const data = res.data;
//       console.log({ data });
//       return data;
//     })
//     .catch((e) => console.log);
// };
//https://script.google.com/macros/s/AKfycbyfBt4Ueq6GAULew28xiJrl7T-dIfNDkNm1VZmAzLiD1MySjnTkP5icgtCARxNZ_wN4/exec?type=validate&id=502844123
export async function getServerSideProps(context: any) {
  const { params } = context;
  const response = await userData(params.phone, "type=validate&id=");

  return {
    props: {
      data: response,
    },
  };
}

export const Product = (props: any) => {
  const [inFocus, setInFocuse] = useState(false);
  const [input, setInput] = useState(0);
  const [event, setEvent] = useState<any>();
  const debounceValue = useDebouncs(input, 500);
  useEffect(() => {
    if (debounceValue) {
      const limit = props.product.limit;
      const val = input <= limit ? input : limit;
      props.editProductAmount(event.target.name, event.target.id, val);
      val != input && setInput(val);
    }
  }, [debounceValue]);

  return (
    <div className="flex h-1/4 flex-col items-center ">
      {/* <div className=" relative ml-8 mr-8  mb-8 h-48 w-48 transform bg-gray-800 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 sm:w-8/12"> */}

      <p>{props.product.name}</p>
      <div className="mb-8 flex justify-center ">
        <button
          name="sub"
          onClick={(e: any) =>
            props.editProductAmount(e.target.name, props.product.id)
          }
          className="mt-4 flex h-40 w-6 items-center justify-center border-2 border-red-300 text-2xl hover:bg-red-200"
        >
          -
        </button>

        <div className="relative mr-2 ml-2  h-40  w-40 transform justify-center bg-gray-800 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 ">
          <img
            id={props.product.id}
            // src={props.product.Image}
            src={props.product.Image}
            //fill={true}
            // width={40}
            // height={40}
            // sizes="(max-width: 380px) 100vw,
            // (max-width: 1200px) 50vw,
            // 33vw"
            className=" mb-8 mt-4 h-40 rounded-2xl hover:bg-slate-300"
            alt="Image Alt"
            // loader={loaderProp}
          />
          <input
            id={props.product.id}
            type={"number"}
            name={"input"}
            inputMode={"numeric"}
            onFocus={() => {
              setInput(props.product.amount);
              setInFocuse(true);
            }}
            onBlur={() => setInFocuse(false)}
            onChange={(e: any) => {
              setEvent(e);
              setInput(e.target.value);
            }}
            className="absolute top-1 left-1 flex h-1/4 w-1/2 items-center justify-center rounded-lg bg-green-600  p-4 text-center  "
            value={inFocus ? input : props.product.amount}
          />
          {props.product.amount == props.product.limit && (
            <p className="absolute top-11 left-1 flex h-4 w-1/2 justify-center rounded-lg border-2 border-red-500 text-center  text-[8px] font-bold text-black ">
              הגבלת כמות !
            </p>
          )}
        </div>

        <button
          onClick={(e: any) =>
            props.editProductAmount(e.target.name, props.product.id)
          }
          name="add"
          className="mt-4 flex h-40 w-6 items-center justify-center border-2 border-green-300 hover:bg-green-200"
        >
          +
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};
