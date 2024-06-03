// @ts-ignore
import prisma from "@/app/libs/prismadb";

interface IParams {
    restaurant_reservation_id?: string;
  userId?: string;
  authorId?: string;
}

export default async function getRestaurantReservation(
  params: IParams

) {
  try {
    const {  restaurant_reservation_id, userId, authorId } = params;

    const query: any = {};
        
    if ( restaurant_reservation_id) {
      query.restaurant_reservation_id =  restaurant_reservation_id;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.todo = { userId: authorId };
    }

    const reservations = await prisma.restaurant_reservation.findMany({
      where: query,
      include: {
        restaurant: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      restaurant: {
        ...reservation.restaurant,
        createdAt: reservation.restaurant.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
