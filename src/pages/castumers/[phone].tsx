import axios from "axios";
import Image from "next/image";
const loaderProp = (src: any) => {
  console.log({ src });
  return decodeURIComponent(src);
};
export const getUserByPhone = ({ data }: { data: any }) => {
  return (
    <div dir="rtl" className="h-screen">
      <div className="flex justify-center gap-28 ">
        <div className="mr-4  flex  max-w-xs  gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
          <p> שלום </p>
          <p>{data.data.user.name}</p>
        </div>
        <a
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="https://create.t3.gg/en/usage/first-steps"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">שלח הזמנה →</h3>
        </a>
      </div>
      <div className="flex flex-wrap justify-between">
        {data.data.products.map((product: any) => (
          <Product product={product} />
        ))}
      </div>
      {/* <div>{JSON.stringify(data)}</div>{" "} */}
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
    .then((res) => res.data)
    .catch((e) => console.log);
};

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
  console.log({ props });
  return (
    <div className="flex h-1/4 flex-col items-center ">
      {/* <div className=" relative ml-8 mr-8  mb-8 h-48 w-48 transform bg-gray-800 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 sm:w-8/12"> */}

      <p>{props.product.name}</p>
      <div className="mb-8 flex justify-center ">
        <p className="mt-4 flex h-40 w-6 items-center justify-center border-2 border-red-300 text-2xl hover:bg-red-200">
          -
        </p>

        <div className="relative mr-2 ml-2  h-40  w-40 transform justify-center bg-gray-800 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 ">
          <Image
            id={props.product.id}
            src={props.product.Image}
            fill={true}
            // width={40}
            // height={40}
            sizes="(max-width: 380px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            className=" mb-8 mt-4 h-40 rounded-2xl hover:bg-slate-300"
            alt="Image Alt"
            // loader={loaderProp}
          />
          <div className="absolute top-1 left-1 h-1/4 w-1/4 rounded-full bg-red-300 p-4">
            ds
          </div>
        </div>
        <p className="mt-4 flex h-40 w-6 items-center justify-center border-2 border-green-300 hover:bg-green-200">
          +
        </p>
      </div>
      {/* </div> */}
    </div>
  );
};
