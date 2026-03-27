import { z } from "zod";

const EnvSchema = z.object({
  // client
  CLIENT_URL: z.string().min(3, "CLIENT_URL is required"),

  // database
  DATABASE_URL: z.string().min(3, "DATABASE_URL is required"),

  // better auth
  BETTER_AUTH_SECRET: z.string().min(3, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.string().min(3, "BETTER_AUTH_URL is required"),

  // google oauth
  GOOGLE_CLIENT_ID: z.string().min(3, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(3, "GOOGLE_CLIENT_SECRET is required"),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error);
  process.exit(1);
}

export const env = parsedEnv.data;
