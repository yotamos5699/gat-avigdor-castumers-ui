import { useRouter } from "next/router";
import { Module_ } from "~/pages/mainDashboard/modules";

export const go2App = ({ m }: { m: Module_ }) => {
  console.log({ m });
  // const { push } = useRouter();
  switch (m.שם) {
    case "biziRows": {
      return "/biziRows";
    }
  }
  return null;
};
// IF MIZOOG
// git branch --set-upstream-to remotes/upstream/main
// git fetch upstream
//  git rebase upstream/main
// ************************

// IF CENT COMMIT
//  git branch --set-upstream-to remotes/origin/main
