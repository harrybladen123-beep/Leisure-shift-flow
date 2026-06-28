import { redirect } from "next/navigation";
import { getCurrentDbUser, portalPathForRole } from "@/lib/auth";

export default async function DashboardPage() {
  const dbUser = await getCurrentDbUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  redirect(portalPathForRole(dbUser.role));
}
