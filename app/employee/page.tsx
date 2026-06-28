import { currentUser } from "@clerk/nextjs/server";

export default async function EmployeePage() {
  const user = await currentUser();

  return (
    <div className="flex flex-1 flex-col gap-2 p-8">
      <h1 className="text-2xl font-semibold">Employee Portal</h1>
      <p>Signed in as {user?.primaryEmailAddress?.emailAddress}</p>
      <p className="text-zinc-600 dark:text-zinc-400">
        Your rota, leave requests, and shift swaps land here in a future PR.
      </p>
    </div>
  );
}
