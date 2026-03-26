import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ status: "hello lambda hono" });
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

// export default app;
export const handler = handle(app);
