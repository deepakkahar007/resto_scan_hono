import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { type Auth, auth, authMiddleware } from "./auth";
import { prettyJSON } from "hono/pretty-json";
import { compress } from "hono/compress";
import { HTTPException } from "hono/http-exception";

export const createRouter = () => {
  return new Hono<{
    Variables: {
      user: Auth["$Infer"]["Session"]["user"] | null;
      session: Auth["$Infer"]["Session"]["session"] | null;
    };
  }>();
};

export const createHonoApp = () => {
  const app = createRouter();

  app.use(
    "*", // or replace with "*" to enable cors for all routes
    cors({
      origin: "http://localhost:5173", // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  );

  app.use(logger());
  app.use(prettyJSON());
  app.use(compress());

  app.use("*", authMiddleware);

  app.notFound((c) => {
    return c.json({ error: "route does not exist" }, 404);
  });

  app.onError((err, c) => {
    if (err instanceof HTTPException) {
      return c.json({ error: err.message }, err.status);
    }

    return c.json({ error: "Internal server error" }, 500);
  });

  return app;
};
