import { RestaurentTable } from "@/drizzle/models";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import { z } from "zod";

export const createRestaurentSchema = createInsertSchema(RestaurentTable, {
  name: (s) =>
    s
      .trim()
      .min(3, "the name must be at least 3 characters long")
      .max(50, "the name must be at most 50 characters long"),
  description: (s) =>
    s.trim().min(3, "the description must be at least 3 characters long"),
  slug: (s) => s.trim().min(3),
  categories: (s) => s.trim().min(3),
  cuisine: (s) => s.default("indian"),
  icon: (s) => s.trim().min(3),
  cover_image: (s) => s.trim().min(3),
  isActive: (s) => s.default(true),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  organization_id: true,
});
