import { getRestaurentByIdQuery } from "@/drizzle/query";
import { createRouter } from "@/lib/createHono";
import { writeTxtFile } from "@/utils/log";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const userRouter = createRouter();

userRouter.openapi(
  createRoute({
    method: "get",
    path: "/restaurent/menu/{id}",
    tags: ["User"],
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              menu: z.array(
                z.object({
                  id: z.string(),
                }),
              ),
            }),
          },
        },
        description: "Menu retrieved successfully",
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");

    const result = await getRestaurentByIdQuery(
      "9f5a3992-e5d6-4899-a824-fc44a7b223cc",
    );

    return c.json(
      {
        menu: [{ id: id }],
      },
      200,
    );
  },
);
