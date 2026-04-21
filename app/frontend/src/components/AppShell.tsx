import type { ReactNode } from "react";
import Link from "next/link";
import { ApiStatusBadge } from "@/components/ApiStatusBadge";
import { Sidebar } from "@/components/Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark">MC</span>
          <span className="brand-copy">
            <strong>MindMap Care</strong>
            <span className="brand-subtitle">Explainable screening and triage</span>
          </span>
        </Link>
        <div className="topbar-actions">
          <ApiStatusBadge />
          <Link className="button primary" href="/screenings/new">
            New screening
          </Link>
        </div>
      </header>
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}
