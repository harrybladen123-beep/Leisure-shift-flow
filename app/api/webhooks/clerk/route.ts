import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@/lib/generated/prisma/enums";

export async function POST(req: NextRequest) {
  let evt;
  try {
    evt = await verifyWebhook(req);
  } catch (err) {
    console.error("Clerk webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  switch (evt.type) {
    case "user.created": {
      const { id, email_addresses, primary_email_address_id } = evt.data;
      const primaryEmail =
        email_addresses.find((e) => e.id === primary_email_address_id)
          ?.email_address ?? email_addresses[0]?.email_address;

      if (!primaryEmail) {
        console.error("user.created webhook missing an email address", id);
        return new Response("Missing email", { status: 400 });
      }

      const user = await prisma.user.upsert({
        where: { clerkId: id },
        create: { clerkId: id, email: primaryEmail, role: Role.EMPLOYEE },
        update: { email: primaryEmail },
      });

      await prisma.employee.updateMany({
        where: { email: primaryEmail, userId: null },
        data: { userId: user.id },
      });
      break;
    }

    case "user.updated": {
      const { id, email_addresses, primary_email_address_id } = evt.data;
      const primaryEmail =
        email_addresses.find((e) => e.id === primary_email_address_id)
          ?.email_address ?? email_addresses[0]?.email_address;

      if (primaryEmail) {
        await prisma.user.updateMany({
          where: { clerkId: id },
          data: { email: primaryEmail },
        });
      }
      break;
    }

    case "user.deleted": {
      const { id } = evt.data;
      if (id) {
        await prisma.user.deleteMany({ where: { clerkId: id } });
      }
      break;
    }

    default:
      break;
  }

  return new Response("OK", { status: 200 });
}
