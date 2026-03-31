import { pgTable, varchar, uuid, index } from "drizzle-orm/pg-core";
import { id, createdAt, isActive, updatedAt } from "./modelsHelper";
import { RestaurentTable } from "./RestaurentTable";

export const AddressTable = pgTable(
  "address",
  {
    id,
    isActive,
    createdAt,
    updatedAt,

    restaurent_id: uuid()
      .notNull()
      .references(() => RestaurentTable.id),
    address: varchar().notNull(),
    city: varchar().notNull(),
    state: varchar().notNull(),
    zip: varchar().notNull(),
    country: varchar().notNull(),
  },
  (t) => [index("address_restaurant_id_idx").on(t.restaurent_id)],
);

export type AddressType = typeof AddressTable.$inferSelect;
export type CreateAddressType = typeof AddressTable.$inferInsert;
