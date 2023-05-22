import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { AdminDataContextProvider } from "~/context/adminContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AdminDataContextProvider>
        <Component {...pageProps} />
      </AdminDataContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
