import { AddressTable, RestaurentTable } from "@/drizzle/models";
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

export const createAddressSchema = createInsertSchema(AddressTable, {
  address: (s) => s.trim().min(3, "address must be at least 3 characters long"),
  city: (s) => s.trim().min(3, "city must be at least 3 characters long"),
  state: (s) => s.trim().min(3, "state must be at least 3 characters long"),
  country: (s) => s.trim().min(3, "country must be at least 3 characters long"),
  zip: (s) => s.trim().length(6, "zip code must be 6 characters long"),
  restaurent_id: (s) => s.trim().min(1, "restaurent id is required"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});
