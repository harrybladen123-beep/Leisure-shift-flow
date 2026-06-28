import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">ShiftFlow</h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        The right people, in the right place, at the right time.
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard" className={buttonVariants({ variant: "default" })}>
          Go to dashboard
        </Link>
        <Link href="/sign-in" className={buttonVariants({ variant: "outline" })}>
          Sign in
        </Link>
      </div>
    </div>
  );
}
