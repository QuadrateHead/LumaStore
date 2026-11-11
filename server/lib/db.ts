import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL, NODE_ENV } from "../config/env.ts";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

const adapter = new PrismaPg({ connectionString: DATABASE_URL });

export const prisma = new PrismaClient({
  adapter,
  log: NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

export const connectDB = async (): Promise<void> => {
  await prisma.$connect();
  console.log("DB is connected");
};
export const disconnectDB = async (): Promise<void> => {
  await prisma.$disconnect();
  console.log("DB is disconnected");
};