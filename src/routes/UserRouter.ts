import { createRouter } from "@/lib/createHono";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(4),
  password: z.string().min(6),
});

const responseSchema = z.object({
  message: z.string(),
});

export const userRouter = createRouter();

userRouter.openapi(
  createRoute({
    method: "get",
    path: "/user",
    tags: ["User"],

    responses: {
      200: {
        content: {
          "application/json": {
            schema: responseSchema,
          },
        },
        description: "User fetched successfully",
      },
    },
  }),
  async (c) => {
    return c.json({ message: "User fetched successfully" }, 200);
  },
);

userRouter.openapi(
  createRoute({
    method: "post",
    path: "/user",
    tags: ["User"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: userSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          "application/json": {
            schema: responseSchema,
          },
        },
        description: "User created successfully",
      },
    },
  }),

  async (c) => {
    const { name, email, password } = c.req.valid("json");
    console.log(name, email, password);
    return c.json({ message: "User created successfully" }, 201);
  },
);

userRouter.openapi(
  createRoute({
    method: "get",
    path: "/user/{id}",
    tags: ["User"],
    request: {
      params: z.object({
        id: z.string().min(1).openapi({
          example: "123",
        }),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: responseSchema,
          },
        },
        description: "User fetched successfully",
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    console.log(id);
    return c.json({ message: "User fetched successfully" }, 200);
  },
);
