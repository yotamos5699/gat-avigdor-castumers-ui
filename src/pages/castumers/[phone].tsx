import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "~/components/Spinner";
import useDebouncs from "~/hooks/useDebouncs";
const loaderProp = (src: any) => {
  console.log({ src });
  return decodeURIComponent(src);
};

export const getUserByPhone = ({ data }: { data: any }) => {
  const [Products, setProducts] = useState<any[]>();
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

  const loadingDemo = () => {
    setTimeout(() => {
      setOrderd(true);
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      {loading ? (
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
                setLoading(true);
                loadingDemo();
              }}
              // href="https://create.t3.gg/en/usage/first-steps"
              // target="_blank"
            >
              <h3 className=" font-bold">שלח הזמנה →</h3>
            </a>
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

export const userData = async (id: any) => {
  console.log({ id });
  return await axios
    .get(
      "https://script.google.com/macros/s/AKfycbyfBt4Ueq6GAULew28xiJrl7T-dIfNDkNm1VZmAzLiD1MySjnTkP5icgtCARxNZ_wN4/exec?type=validate&id=" +
        id.phone,
      { withCredentials: false }
    )
    .then((res) => {
      const data = res.data;
      console.log({ data });
      return data;
    })
    .catch((e) => console.log);
};
//https://script.google.com/macros/s/AKfycbyfBt4Ueq6GAULew28xiJrl7T-dIfNDkNm1VZmAzLiD1MySjnTkP5icgtCARxNZ_wN4/exec?type=validate&id=502844123
export async function getServerSideProps(context: any) {
  const { params } = context;
  const response = await userData(params);

  return {
    props: {
      data: response,
    },
  };
}

export const Product = (props: any) => {
  const [inFocus, setInFocuse] = useState(false);
  const [input, setInput] = useState();
  const [event, setEvent] = useState<any>();
  const debounceValue = useDebouncs(input, 500);
  useEffect(() => {
    debounceValue &&
      props.editProductAmount(event.target.name, event.target.id, input);
  }, [debounceValue]);

  console.log({ props });
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
          <Image
            id={props.product.id}
            // src={props.product.Image}
            src={
              "https://drive.google.com/uc?export=view&id=1Iz9dQZZ165AfYxtXxykCTrn54XS1Dkvy"
            }
            fill={true}
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
            // inputMode={"numeric"}
            onFocus={() => {
              setInput(props.product.amount);
              setInFocuse(true);
            }}
            onBlur={() => setInFocuse(false)}
            onChange={(e: any) => {
              setEvent(e);
              setInput(
                e.target.value <= props.product.limit
                  ? e.target.value
                  : props.product.limit
              );
            }}
            className="absolute top-1 left-1 flex h-1/4 w-1/2 items-center justify-center rounded-lg bg-green-600  p-4 text-center  "
            value={inFocus ? input : props.product.amount}
          />
          {props.product.amount == props.product.limit && (
            <p className="absolute top-4 left-1 flex h-1/4 w-1/2 p-4 text-center text-[8px] ">
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
