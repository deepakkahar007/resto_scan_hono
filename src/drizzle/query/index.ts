import { db } from "../db";

export const getAllResturentQuery = async () => {
  const result = await db.query.RestaurentTable.findMany({
    columns: {
      id: true,
      name: true,
      slug: true,
      organization_id: true,
      isActive: true,
    },
  });
  return result;
};
