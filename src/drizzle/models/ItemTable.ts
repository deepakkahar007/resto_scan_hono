import { pgTable, varchar, uuid, text, index } from "drizzle-orm/pg-core";
import {
  id,
  createdAt,
  isActive,
  updatedAt,
  ItemTypeEnum,
} from "./modelsHelper";
import { RestaurentTable } from "./RestaurentTable";
import { CategoryTable } from "./CategoryTable";

export const ItemTable = pgTable(
  "item",
  {
    id,
    isActive,
    createdAt,
    updatedAt,

    restaurent_id: uuid()
      .notNull()
      .references(() => RestaurentTable.id),
    category_id: uuid()
      .notNull()
      .references(() => CategoryTable.id),

    name: varchar().notNull(),
    description: text().notNull(),
    item_type: ItemTypeEnum().notNull(),
  },
  (t) => [
    index("item_restaurant_id_idx").on(t.restaurent_id),
    index("item_category_id_idx").on(t.category_id),
  ],
);
