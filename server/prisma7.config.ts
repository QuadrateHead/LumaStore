import { defineConfig } from "prisma/config";
import { DATABASE_URL } from "./config/env.ts";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DIRECT_URL ?? DATABASE_URL,
  },
});
