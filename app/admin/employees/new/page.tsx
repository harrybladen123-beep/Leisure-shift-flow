import { createEmployee } from "../actions";
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

export default function NewEmployeePage() {
  return (
    <form action={createEmployee} className="flex max-w-md flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold">Add Employee</h1>

      <div className="flex flex-col gap-1">
        <Label htmlFor="firstName">First name</Label>
        <Input id="firstName" name="firstName" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="lastName">Last name</Label>
        <Input id="lastName" name="lastName" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="department">Job role</Label>
        <Select name="department" required>
          <SelectTrigger id="department">
            <SelectValue placeholder="Select job role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Reception">Reception</SelectItem>
            <SelectItem value="Leisure Attendants">Leisure Attendants</SelectItem>
            <SelectItem value="Fitness Instructor">Fitness Instructor</SelectItem>
            <SelectItem value="Swimming Teacher">Swimming Teacher</SelectItem>
            <SelectItem value="Management Team">Management Team</SelectItem>
            <SelectItem value="Trainer Assessor">Trainer Assessor</SelectItem>
            <SelectItem value="Housekeeper">Housekeeper</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="employmentType">Casual or contracted</Label>
        <Select name="employmentType" required>
          <SelectTrigger id="employmentType">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CASUAL">Casual</SelectItem>
            <SelectItem value="CONTRACTED">Contracted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="contractHours">Contract hours (weekly)</Label>
        <Input id="contractHours" name="contractHours" type="number" step="0.5" />
      </div>

      <Button type="submit">Create employee</Button>
    </form>
  );
}
