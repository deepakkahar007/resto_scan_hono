import { pgTable, varchar, uuid, integer, index } from "drizzle-orm/pg-core";
import { id, createdAt, isActive, updatedAt } from "./modelsHelper";
import { ItemTable } from "./ItemTable";

export const QuantityTable = pgTable(
  "quantity",
  {
    id,
    isActive,
    createdAt,
    updatedAt,

    item_id: uuid()
      .notNull()
      .references(() => ItemTable.id),
    quantity: varchar().notNull(),
    price: integer().notNull(),
    discounted_price: integer().notNull(),
  },
  (t) => [index("quantity_item_id_idx").on(t.item_id)],
);
