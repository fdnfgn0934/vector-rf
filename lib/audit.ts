import { prisma } from "@/lib/prisma";
import { getRequestIp } from "@/lib/request-ip";

export async function writeAudit(params: {
  actorId?: number | null;
  actorEmail?: string | null;
  action: string;
  entity?: string | null;
  entityId?: number | null;
  details?: any;
}) {
  const ip = await getRequestIp();

  await prisma.auditLog.create({
    data: {
      actorId: params.actorId ?? null,
      actorEmail: params.actorEmail ?? null,
      action: params.action,
      entity: params.entity ?? null,
      entityId: params.entityId ?? null,
      details: params.details ?? null,
      ip,
    },
  });
}
