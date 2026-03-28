import { auth } from "@/lib/auth";
import { configureOpenApi, createHonoApp } from "@/lib/createHono";
import { userRouter } from "@/routes/UserRouter";

import { handle } from "hono/aws-lambda";

const app = createHonoApp();

const routes = [userRouter];

configureOpenApi(app);

routes.forEach((route) => {
  app.route("/", route);
});

app.get("/", (c) => {
  return c.json({ status: "hello lambda hono" });
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// export default app;
export const handler = handle(app);
