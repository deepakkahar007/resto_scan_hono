import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(3, "DATABASE_URL is required"),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error);
  process.exit(1);
}

export const env = parsedEnv.data;
