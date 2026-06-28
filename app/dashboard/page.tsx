import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8">
      <h1 className="text-2xl font-semibold">ShiftFlow Dashboard</h1>
      <p>Signed in as {user.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
}
