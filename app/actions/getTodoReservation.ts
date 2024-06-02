import prisma from "@/app/libs/prismadb";

interface IParams {
  todo_id?: string;
  userId?: string;
  authorId?: string;
}

export default async function getTodoReservation(
  params: IParams

) {
  try {
    const { todo_id, userId, authorId } = params;

    const query: any = {};
        
    if (todo_id) {
      query.todo_id = todo_id;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.todo = { userId: authorId };
    }

    const reservations = await prisma.reservation_todo.findMany({
      where: query,
      include: {
        todo: true
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
      todo: {
        ...reservation.todo,
        createdAt: reservation.todo.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
