import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function ManagerPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold">Manager Portal</h1>
      <div className="flex gap-4">
        <Link href="/manager/rota" className={buttonVariants()}>
          Rota
        </Link>
        <Link href="/manager/leave" className={buttonVariants({ variant: "outline" })}>
          Leave requests
        </Link>
      </div>
    </div>
  );
}
