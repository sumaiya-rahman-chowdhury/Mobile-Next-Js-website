"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const SessionProviderWrapper = ({ children }) => {
  return <SessionProvider>
    <Toaster/>
    {children}
    </SessionProvider>;
};
export default SessionProviderWrapper;
