import { requestLeave } from "../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function NewLeaveRequestPage() {
  return (
    <form action={requestLeave} className="flex max-w-md flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold">Request leave</h1>

      <div className="flex flex-col gap-1">
        <Label htmlFor="leaveType">Leave type</Label>
        <Select name="leaveType" required>
          <SelectTrigger id="leaveType">
            <SelectValue placeholder="Select leave type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ANNUAL">Annual</SelectItem>
            <SelectItem value="SICK">Sick</SelectItem>
            <SelectItem value="COMPASSIONATE">Compassionate</SelectItem>
            <SelectItem value="MATERNITY">Maternity</SelectItem>
            <SelectItem value="TRAINING">Training</SelectItem>
            <SelectItem value="UNPAID">Unpaid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="startDate">Start date</Label>
        <Input id="startDate" name="startDate" type="date" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="endDate">End date</Label>
        <Input id="endDate" name="endDate" type="date" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="reason">Reason (optional)</Label>
        <Textarea id="reason" name="reason" />
      </div>

      <Button type="submit">Submit request</Button>
    </form>
  );
}
