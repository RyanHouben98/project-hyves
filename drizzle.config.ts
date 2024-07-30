import { getEnvironmentVariable } from "@/utils/environment-helper";
import { Config, defineConfig } from "drizzle-kit";

const connectionString = getEnvironmentVariable("DATABASE_URL");

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
}) satisfies Config;
