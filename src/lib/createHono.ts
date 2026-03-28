import { OpenAPIHono } from "@hono/zod-openapi";
import { authMiddleware } from "./auth";
import { type User, type Session } from "better-auth";
import { HTTPException } from "hono/http-exception";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { compress } from "hono/compress";
import { env } from "@/env/envSchema";

export type AppContext = {
  Variables: {
    user: User | null;
    session: Session | null;
  };
};

export type App = OpenAPIHono<AppContext>;

export const createRouter = () => {
  return new OpenAPIHono<AppContext>();
};

export const createHonoApp = () => {
  const app = createRouter();

  app.use(
    "*",
    cors({
      origin: env.CLIENT_URL,
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
    return c.json({ error: "Not Found" }, 404);
  });

  app.onError((err, c) => {
    if (err instanceof HTTPException) {
      return c.json({ error: err.message }, err.status);
    }

    return c.json({ error: "Internal server error" }, 500);
  });

  return app;
};

export const configureOpenApi = (app: OpenAPIHono<AppContext>) => {
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "RestoScan API",
      description: "API for RestoScan application",
    },
  });

  app.get(
    "/scalar",
    Scalar((c) => {
      return {
        url: "/docs",
        pageTitle: "Resto Scan API",
        darkMode: true,

        layout: "classic",
        theme: "saturn",
        defaultHttpClient: {
          clientKey: "axios",
          targetKey: "node",
        },
      };
    }),
  );
};
