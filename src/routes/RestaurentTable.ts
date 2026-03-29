import { createRestaurentMutation } from "@/drizzle/mutation";
import { getAllResturentQuery } from "@/drizzle/query";
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

    const session = c.get("session");

    const result = await createRestaurentMutation({
      ...body,
      organization_id: session?.userId!,
    });

    return c.json(
      { id: result?.id!, message: "Restaurent created successfully" },
      201,
    );
  },
);

restaurentRouter.openapi(
  createRoute({
    method: "get",
    path: "/restaurent",
    tags: ["Restaurent"],
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                slug: z.string(),
                organization_id: z.string(),
                isActive: z.boolean(),
              }),
            ),
          },
        },
        description: "Restaurent created successfully",
      },
    },
  }),
  async (c) => {
    const result = await getAllResturentQuery();

    return c.json(result, 200);
  },
);
