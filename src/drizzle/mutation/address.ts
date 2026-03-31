import { db } from "../db";
import { AddressTable, type CreateAddressType } from "../models/AddressTable";
import { DrizzleError } from "drizzle-orm";

export const createAddressMutation = async (data: CreateAddressType) => {
  try {
    const result = await db
      .insert(AddressTable)
      .values(data)
      .returning({ id: AddressTable.id });

    return result[0];
  } catch (err: unknown) {
    if (err instanceof DrizzleError) {
      throw new Error(err.message);
    }
    throw new Error("Failed to create address");
  }
};

export const getAllAddressByRestaurentIdQuery = async (
  restaurentId: string,
) => {
  try {
    const result = await db.query.AddressTable.findMany({
      where: {
        AND: [{ restaurent_id: restaurentId }, { isActive: true }],
      },
    });

    return result;
  } catch (err: unknown) {
    if (err instanceof DrizzleError) {
      throw new Error(err.message);
    }
    throw new Error("Failed to get address");
  }
};
