// @ts-ignore 
import prisma from "@/app/libs/prismadb";

interface IParams {
  restaurant_id?: string;
}

export default async function getrestauraById(
  params: IParams
) {
  try {
    const { restaurant_id } = params;

    const restaura = await prisma.restaurant.findUnique({
      where: {
        id: restaurant_id,
      },
      include: {
        user: true
      }
    });

    if (!restaura) {
      return null;
    }

    return {
      ...restaura,
      createdAt: restaura.createdAt.toString(),
      user: {
        ...restaura.user,
        createdAt: restaura.user.createdAt.toString(),
        updatedAt: restaura.user.updatedAt.toString(),
        emailVerified: 
          restaura.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
