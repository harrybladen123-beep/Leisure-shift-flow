import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { buttonVariants } from "@/components/ui/button";

export default async function EmployeePage() {
  const user = await currentUser();

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold">Employee Portal</h1>
      <p>Signed in as {user?.primaryEmailAddress?.emailAddress}</p>
      <div className="flex gap-4">
        <Link href="/employee/rota" className={buttonVariants()}>
          My rota
        </Link>
        <Link href="/employee/leave" className={buttonVariants({ variant: "outline" })}>
          My leave
        </Link>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400">
        Shift swaps land here in a future PR.
      </p>
    </div>
  );
}
