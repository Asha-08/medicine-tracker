import type { PrismaConfig } from "prisma";

try {
  const { loadEnvFile } = require("node:process");
  loadEnvFile(".env");
} catch {
  
}

export default {
  datasource: {
    url: process.env.DATABASE_URL!,
  },
} satisfies PrismaConfig;
