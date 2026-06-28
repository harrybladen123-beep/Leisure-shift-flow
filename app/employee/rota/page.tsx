import { getCurrentEmployee } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default async function MyRotaPage() {
  const employee = await getCurrentEmployee();

  if (!employee) {
    return (
      <div className="flex flex-1 flex-col gap-2 p-8">
        <h1 className="text-2xl font-semibold">My rota</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          No employee profile is linked to your account yet. Contact an
          administrator to get set up.
        </p>
      </div>
    );
  }

  const shifts = await prisma.shift.findMany({
    where: {
      employeeId: employee.id,
      date: { gte: new Date(new Date().toDateString()) },
    },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold">My rota</h1>
      <Table>
        <TableHeader>
          <TableRow>
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
