import { defineRelations } from "drizzle-orm";
import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
  RestaurentTable: {
    address: r.many.AddressTable(),
    category: r.many.CategoryTable(),
    items: r.many.ItemTable(),
  },
  AddressTable: {
    restaurent: r.one.RestaurentTable({
      from: r.AddressTable.restaurent_id,
      to: r.RestaurentTable.id,
    }),
    category: r.many.CategoryTable(),
  },
  CategoryTable: {
    resturent: r.one.RestaurentTable({
      from: r.CategoryTable.restaurent_id,
      to: r.RestaurentTable.id,
    }),
    address: r.one.AddressTable({
      from: r.CategoryTable.address_id,
      to: r.AddressTable.id,
    }),
  },
  ItemTable: {
    resturent: r.one.RestaurentTable({
      from: r.ItemTable.restaurent_id,
      to: r.RestaurentTable.id,
    }),
    category: r.one.CategoryTable({
      from: r.ItemTable.category_id,
      to: r.CategoryTable.id,
    }),
  },
  SubCategoryTable: {
    resturent: r.one.RestaurentTable({
      from: r.SubCategoryTable.restaurent_id,
      to: r.RestaurentTable.id,
    }),
    category: r.one.CategoryTable({
      from: r.SubCategoryTable.category_id,
      to: r.CategoryTable.id,
    }),
  },
  QuantityTable: {
    item: r.one.ItemTable({
      from: r.QuantityTable.item_id,
      to: r.ItemTable.id,
    }),
  },
  AddOnTable: {
    item: r.one.ItemTable({
      from: r.AddOnTable.item_id,
      to: r.ItemTable.id,
    }),
  },
}));
