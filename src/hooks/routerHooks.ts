import Router, { useRouter } from "next/router";
import { argv } from "process";
import { date } from "zod";

export const saveRouterProps = (data: any | null, path?: string) => {
  console.log("saveRouterProps", { date, path });
  if (data) {
    Router.push({
      pathname: path,

      query: {
        ...data,
      },
    });
  } else {
    Router.push({
      pathname: path,
    });
  }
};

export const loadServerPropas = () => {
  const router = useRouter();
  const values = router.query;
  console.log("loadServerPropas", { values, router });
  return { ...values };
};
