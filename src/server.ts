import { handle } from "hono/aws-lambda";
import { auth } from "@/lib/auth";
import { configureOpenApi, createHonoApp } from "@/lib/createHono";
import { userRouter } from "@/routes/UserRouter";
import { restaurentRouter } from "@/routes/RestaurentTable";
import { addressRouter } from "./routes/AddressRouter";

const app = createHonoApp();

const routes = [userRouter, restaurentRouter, addressRouter];

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

export const handler = handle(app);
