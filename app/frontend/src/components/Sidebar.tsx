"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "H" },
  { href: "/screenings/new", label: "New screening", icon: "+" },
  { href: "/patients/risk-summary", label: "Risk summary", icon: "R" },
  { href: "/triage", label: "Triage queue", icon: "Q" },
  { href: "/dashboard", label: "Dashboard", icon: "D" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar-section">
        <p className="sidebar-label">Workspace</p>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                className={`nav-item ${isActive ? "active" : ""}`}
                href={item.href}
                key={item.href}
              >
                <span className="nav-icon" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-note">
        Screening results are decision support only. Clinical judgment and local
        referral protocols remain the source of care decisions.
      </div>
    </aside>
  );
}
