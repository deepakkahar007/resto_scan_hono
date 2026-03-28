import { pgTable, varchar, index, uuid } from "drizzle-orm/pg-core";
import { id, createdAt, isActive, updatedAt } from "./modelsHelper";
import { RestaurentTable } from "./RestaurentTable";
import { CategoryTable } from "./CategoryTable";

export const SubCategoryTable = pgTable(
  "subcategory",
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
    subcategory: varchar().notNull(),
  },
  (t) => [
    index("subcategory_restaurant_id_idx").on(t.restaurent_id),
    index("subcategory_category_id_idx").on(t.category_id),
  ],
);
