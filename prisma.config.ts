import { loadEnvFile } from "node:process";
import type { PrismaConfig } from "prisma";

loadEnvFile(".env");

export default {
  datasource: {
    url: process.env.DATABASE_URL!,
  },
} satisfies PrismaConfig;