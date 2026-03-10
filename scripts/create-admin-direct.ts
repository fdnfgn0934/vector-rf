import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@vectorrf.local";
  const password = process.env.ADMIN_PASSWORD || "admin12345";
  const name = process.env.ADMIN_NAME || "Главный админ";

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing in .env");
  }

  const prisma = new PrismaClient({
  log: ["error", "warn"],
});

  const hash = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { password: hash, role: "ADMIN", name, isActive: true },
    });
    console.log("Admin updated:", email);
  } else {
    await prisma.user.create({
      data: { email, password: hash, role: "ADMIN", name, isActive: true },
    });
    console.log("Admin created:", email);
  }

  const s = await prisma.siteSettings.findFirst();
  if (!s) {
    await prisma.siteSettings.create({ data: {} });
    console.log("SiteSettings created");
  } else {
    console.log("SiteSettings already exists");
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});