import { useRouter } from "next/router";
import { Module_ } from "~/pages/mainDashboard/modules";

export const go2App = ({ m }: { m: Module_ }) => {
  console.log({ m });
  const { push } = useRouter();
  switch (m.שם) {
    case "biziRows": {
      push("/biziRows");
    }
  }
};
