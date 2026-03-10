import "dotenv/config";
import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("Missing DATABASE_URL in .env");

// adapter-pg как в приложении
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Главный админ";

  if (!email || !password) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env");
  }

  // В БД в поле user.password кладём ХЭШ (не сырой пароль)
  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name,
      password: passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
    update: {
      name,
      password: passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });

  console.log("Admin created/updated:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
