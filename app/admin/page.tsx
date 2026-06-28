import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default async function AdminPage() {
  const today = new Date(new Date().toDateString());

  const totalEmployees = await prisma.employee.count();
  const openShifts = await prisma.shift.count({
    where: { date: { gte: today } },
  });
  const pendingLeave = await prisma.leaveRequest.count({
    where: { status: "PENDING" },
  });

  const stats = [
    { label: "Total Employees", value: totalEmployees },
    { label: "Active Staff", value: "—" },
    { label: "Open Shifts", value: openShifts },
    { label: "Leave Requests", value: pendingLeave },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <Link href="/admin/employees" className={buttonVariants()}>
          Manage employees
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle>{stat.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {stat.value}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
