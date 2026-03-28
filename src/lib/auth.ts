import { env } from "@/env/envSchema";
import { betterAuth } from "better-auth";
import { organization, admin } from "better-auth/plugins";
import type { Context, Next } from "hono";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [organization(), admin()],
});

export type Auth = typeof auth;

export const authMiddleware = async (c: Context, next: Next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }
  c.set("user", session.user);
  c.set("session", session.session);
  await next();
};
