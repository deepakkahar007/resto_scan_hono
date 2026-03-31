import {
  createAddressMutation,
  getAllAddressByRestaurentIdQuery,
} from "@/drizzle/mutation/address";
import { getRestaurentByIdQuery } from "@/drizzle/query";
import { createRouter } from "@/lib/createHono";
import { createAddressSchema } from "@/schema/requestSchema";
import { writeTxtFile } from "@/utils/log";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const addressRouter = createRouter();

addressRouter.openapi(
  createRoute({
    method: "post",
    path: "address",
    tags: ["Address"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: createAddressSchema,
          },
        },
        description: "Create restuarent address",
      },
    },
    responses: {
      201: {
        content: {
          "application/json": {
            schema: z.object({
              id: z.string(),
              message: z.string().min(1),
            }),
          },
        },
        description: "Address created successfully",
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const address = await createAddressMutation(body);

    return c.json(
      { id: "asfas", message: "Address created successfully" },
      201,
    );
  },
);

addressRouter.openapi(
  createRoute({
    method: "get",
    path: "address/{restaurentId}",
    tags: ["Address"],
    request: {
      params: z.object({
        restaurentId: z.string(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(
              z.object({
                id: z.string(),
                address: z.string(),
                city: z.string(),
                state: z.string(),
                zip: z.string(),
                country: z.string(),
                isActive: z.boolean(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            ),
          },
        },
        description: "Address fetched successfully",
      },
    },
  }),
  async (c) => {
    const { restaurentId } = c.req.valid("param");
    const address = await getAllAddressByRestaurentIdQuery(restaurentId);
    return c.json(address);
  },
);
