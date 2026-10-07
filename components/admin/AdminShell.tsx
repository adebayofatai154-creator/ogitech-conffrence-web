"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAdmin } from "@/app/admin/actions";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/research", label: "Published Research" },
];

export function AdminShell({
  adminName,
  children,
}: {
  adminName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const nav = (
    <>
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setDrawerOpen(false)}
          style={{
            display: "block",
            padding: "10px 14px",
            borderRadius: "var(--r-md)",
            fontFamily: "var(--font-h)",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            color: pathname === item.href ? "#fff" : "#C7CCF0",
            background: pathname === item.href ? "var(--royal)" : "transparent",
            marginBottom: 4,
          }}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 240,
          background: "var(--navy-dark)",
          padding: "24px 16px",
          flexShrink: 0,
          display: "none",
        }}
        className="admin-sidebar-desktop"
      >
        <div
          style={{
            color: "#fff",
            fontFamily: "var(--font-h)",
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 28,
            padding: "0 6px",
          }}
        >
          OGITECH SET Admin
        </div>
        {nav}
        <form action={logoutAdmin} style={{ marginTop: 24, padding: "0 6px" }}>
          <button
            type="submit"
            className="btn btn-ghost"
            style={{ color: "#C7CCF0", padding: "8px 0", minHeight: "auto" }}
          >
            Sign out
          </button>
        </form>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          className="admin-topbar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            borderBottom: "1px solid var(--border)",
            background: "#fff",
          }}
        >
          <button
            className="admin-menu-btn"
            onClick={() => setDrawerOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "none",
            }}
            aria-label="Open menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#03055A"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            Signed in as {adminName}
          </span>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>

      {drawerOpen && (
        <div className="mobile-drawer" onClick={() => setDrawerOpen(false)}>
          <div
            className="panel"
            style={{ background: "var(--navy-dark)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {nav}
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="btn btn-ghost"
                style={{ color: "#C7CCF0" }}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .admin-sidebar-desktop { display: block !important; }
        }
        @media (max-width: 899px) {
          .admin-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </div>
  );
}
