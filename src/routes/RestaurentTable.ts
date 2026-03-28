import { createRouter } from "@/lib/createHono";
import { createRestaurentSchema } from "@/schema/requestSchema";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const restaurentRouter = createRouter();

restaurentRouter.openapi(
  createRoute({
    method: "post",
    path: "/restaurent",
    tags: ["Restaurent"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: createRestaurentSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          "application/json": {
            schema: z.object({
              id: z.string(),
              message: z.string(),
            }),
          },
        },
        description: "Restaurent created successfully",
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    // TODO: Save to database
    // const restaurent = await db.insert(restaurentTable).values(body);

    return c.json({ id: "1", message: "Restaurent created successfully" }, 201);
  },
);
