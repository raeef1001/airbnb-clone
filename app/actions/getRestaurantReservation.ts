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
    const { restaurant_reservation_id, userId, authorId } = params;

    const query: any = {};
        
    if (restaurant_reservation_id) {
      query.restaurant_reservation_id = restaurant_reservation_id;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const restaurant_reservation = await prisma.restaurant_reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const saferestaurant_reservation = restaurant_reservation.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return saferestaurant_reservation;
  } catch (error: any) {
    throw new Error(error);
  }
}
