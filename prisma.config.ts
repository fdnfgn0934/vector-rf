import "dotenv/config";
import { defineConfig } from "prisma/config";

const FALLBACK_DATABASE_URL = "postgresql://placeholder:placeholder@localhost:5432/placeholder?schema=public";

function pickDatasourceUrl() {
  const directUrl = process.env.DIRECT_URL?.trim();
  if (directUrl) return directUrl;

  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (databaseUrl) return databaseUrl;

  return FALLBACK_DATABASE_URL;
}

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: pickDatasourceUrl(),
  },
});
