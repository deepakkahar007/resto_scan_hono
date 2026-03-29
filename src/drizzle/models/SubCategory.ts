import { pgTable, varchar, index, uuid } from "drizzle-orm/pg-core";
import { id, createdAt, isActive, updatedAt } from "./modelsHelper";
import { RestaurentTable } from "./RestaurentTable";
import { CategoriesTable } from "./CategoriesTable";

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
    categories_id: uuid()
      .notNull()
      .references(() => CategoriesTable.id),
    subcategory: varchar().notNull(),
  },
  (t) => [
    index("subcategory_restaurant_id_idx").on(t.restaurent_id),
    index("subcategory_category_id_idx").on(t.categories_id),
  ],
);
