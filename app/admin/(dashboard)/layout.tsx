import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  // Middleware already redirects unauthenticated requests away from /admin/*,
  // this is a defense-in-depth check for the layout itself.
  if (!session) redirect("/admin/login");

  return <AdminShell adminName={session.name}>{children}</AdminShell>;
}
