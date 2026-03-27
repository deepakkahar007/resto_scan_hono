import { auth } from "./lib/auth";
import { createHonoApp } from "./lib/createHono";

// import { handle } from "hono/aws-lambda";

const app = createHonoApp();

app.get("/", (c) => {
  return c.json({ status: "hello lambda hono" });
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default app;
// export const handler = handle(app);
