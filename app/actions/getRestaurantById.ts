import prisma from "@/app/libs/prismadb";

interface IParams {
  restaurant_id?: string;
}

export default async function getRestaurantById(params: IParams) {
  try {
    const { restaurant_id } = params;

    if (!restaurant_id) {
      throw new Error("restaurant_id is required");
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: restaurant_id,
      },
      include: {
        user: true,
      },
    });

    if (!restaurant) {
      return null;
    }

    return {
      ...restaurant,
      createdAt: restaurant.createdAt.toString(),
      user: {
        ...restaurant.user,
        createdAt: restaurant.user.createdAt.toString(),
        updatedAt: restaurant.user.updatedAt.toString(),
        emailVerified: restaurant.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
