"use client";

import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { deleteCookie, getCookie } from "cookies-next";

const ToastContext = createContext(null);

function ToastProvider({ children }: { children: ReactNode }) {
  const hasShown = useRef(0);

  const [status, message] = getCookie("showToast")?.split(":") || [];

  useEffect(() => {
    if (message && hasShown.current === 0) {
      if (status === "ERR") toast.error(message);

      if (status === "SUC") toast.success(message);

      deleteCookie("showToast");

      hasShown.current = 1;
    }

    return () => {
      deleteCookie("showToast");
    };
  }, []);

  return <ToastContext.Provider value={null}>{children}</ToastContext.Provider>;
}

export { ToastProvider };
