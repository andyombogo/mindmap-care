"use client";

import { useApiStatus } from "@/hooks/useApiStatus";

export function ApiStatusBadge() {
  const status = useApiStatus();
  const isOnline = status.state === "online";
  const label =
    status.state === "checking" ? "checking" : isOnline ? "ready" : "offline";

  return (
    <span
      className="status-pill"
      title={status.message}
      aria-label={`Backend API status: ${status.message}`}
    >
      <span className={`status-dot ${isOnline ? "online" : "offline"}`} />
      API {label}
    </span>
  );
}
