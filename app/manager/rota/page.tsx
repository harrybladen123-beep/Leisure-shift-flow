import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default async function RotaPage() {
  const shifts = await prisma.shift.findMany({
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    include: { employee: true },
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Rota</h1>
        <Link href="/manager/rota/new" className={buttonVariants()}>
          Create shift
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Job role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shifts.map((shift) => (
            <TableRow key={shift.id}>
              <TableCell>
                {shift.employee.firstName} {shift.employee.lastName}
              </TableCell>
              <TableCell>{shift.date.toLocaleDateString("en-GB")}</TableCell>
              <TableCell>
                {shift.startTime.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>
                {shift.endTime.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>{shift.department}</TableCell>
              <TableCell>{shift.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
