import { db } from "../db";
import {
  RestaurentTable,
  type CreateRestaurentType,
} from "../models/RestaurentTable";

export const createRestaurentMutation = async (data: CreateRestaurentType) => {
  const result = await db
    .insert(RestaurentTable)
    .values(data)
    .returning({ id: RestaurentTable.id });
  return result[0];
};
