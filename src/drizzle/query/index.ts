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

export const getRestaurentByIdQuery = async (id: string) => {
  const restaurant = await db.query.RestaurentTable.findFirst({
    where: {
      AND: [{ id: id }, { isActive: true }],
    },
    columns: {
      id: true,
      name: true,
      slug: true,
    },
  });

  const categories = db.query.CategoriesTable.findMany({
    where: {
      AND: [{ restaurent_id: restaurant?.id }, { isActive: true }],
    },
    columns: {
      id: true,
      category: true,
      icon: true,
      pin_to_top: true,
    },
  });

  const items = db.query.ItemTable.findMany({
    where: {
      AND: [{ restaurent_id: restaurant?.id }, { isActive: true }],
    },
    columns: {
      id: true,
      name: true,
      description: true,
    },
  });

  const [cats, its] = await Promise.all([categories, items]);

  return { restaurant, categories: cats, items: its };
};
