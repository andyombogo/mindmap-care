"use client";

import { useEffect, useState } from "react";
import { getHealthStatus } from "@/lib/api";

type ApiStatus =
  | { state: "checking"; message: "Checking backend" }
  | { state: "online"; message: "Backend reachable" }
  | { state: "offline"; message: "Backend unavailable" };

export function useApiStatus(): ApiStatus {
  const [status, setStatus] = useState<ApiStatus>({
    state: "checking",
    message: "Checking backend"
  });

  useEffect(() => {
    let isMounted = true;

    getHealthStatus()
      .then(() => {
        if (isMounted) {
          setStatus({ state: "online", message: "Backend reachable" });
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus({ state: "offline", message: "Backend unavailable" });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return status;
}
