import { pgTable, varchar, uuid, integer, index } from "drizzle-orm/pg-core";
import { id, createdAt, isActive, updatedAt } from "./modelsHelper";
import { ItemTable } from "./ItemTable";

export const AddOnTable = pgTable(
  "addon",
  {
    id,
    isActive,
    createdAt,
    updatedAt,

    item_id: uuid()
      .notNull()
      .references(() => ItemTable.id),
    addon_name: varchar().notNull(),
    price: integer().notNull(),
  },
  (t) => [index("addon_item_id_idx").on(t.item_id)],
);
