import { prisma } from "@/lib/prisma";
import {
  approveLeaveRequest,
  rejectLeaveRequest,
  reinstateLeaveRequest,
} from "./actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default async function LeaveReviewPage() {
  const requests = await prisma.leaveRequest.findMany({
    orderBy: { requestedAt: "desc" },
    include: { employee: true },
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold">Leave requests</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>
                {req.employee.firstName} {req.employee.lastName}
              </TableCell>
              <TableCell>{req.leaveType}</TableCell>
              <TableCell>{req.startDate.toLocaleDateString("en-GB")}</TableCell>
              <TableCell>{req.endDate.toLocaleDateString("en-GB")}</TableCell>
              <TableCell>{req.reason ?? "—"}</TableCell>
              <TableCell>{req.status}</TableCell>
              <TableCell>
                {req.status === "PENDING" && (
                  <div className="flex gap-2">
                    <form action={approveLeaveRequest}>
                      <input type="hidden" name="id" value={req.id} />
                      <Button type="submit" size="sm">
                        Approve
                      </Button>
                    </form>
                    <form action={rejectLeaveRequest}>
                      <input type="hidden" name="id" value={req.id} />
                      <Button type="submit" size="sm" variant="destructive">
                        Reject
                      </Button>
                    </form>
                  </div>
                )}
                {req.status === "CANCELLED" && (
                  <form action={reinstateLeaveRequest}>
                    <input type="hidden" name="id" value={req.id} />
                    <Button type="submit" size="sm" variant="outline">
                      Reinstate
                    </Button>
                  </form>
                )}
                {req.status !== "PENDING" && req.status !== "CANCELLED" && "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
