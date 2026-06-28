import { prisma } from "@/lib/prisma";
import { createShift } from "../actions";
import { JOB_ROLES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default async function NewShiftPage() {
  const employees = await prisma.employee.findMany({
    orderBy: { firstName: "asc" },
    select: { id: true, firstName: true, lastName: true },
  });

  return (
    <form action={createShift} className="flex max-w-md flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold">Create shift</h1>

      <div className="flex flex-col gap-1">
        <Label htmlFor="employeeId">Employee</Label>
        <Select name="employeeId" required>
          <SelectTrigger id="employeeId">
            <SelectValue placeholder="Select employee" />
          </SelectTrigger>
          <SelectContent>
            {employees.map((employee) => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="startTime">Start time</Label>
        <Input id="startTime" name="startTime" type="time" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="endTime">End time</Label>
        <Input id="endTime" name="endTime" type="time" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="department">Job role</Label>
        <Select name="department" required>
          <SelectTrigger id="department">
            <SelectValue placeholder="Select job role" />
          </SelectTrigger>
          <SelectContent>
            {JOB_ROLES.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue="DRAFT">
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Create shift</Button>
    </form>
  );
}
