import { prisma } from "@/lib/prisma";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default async function AdminPage() {
  const totalEmployees = await prisma.employee.count();

  const stats = [
    { label: "Total Employees", value: totalEmployees },
    { label: "Active Staff", value: "—" },
    { label: "Open Shifts", value: "—" },
    { label: "Leave Requests", value: "—" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
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
