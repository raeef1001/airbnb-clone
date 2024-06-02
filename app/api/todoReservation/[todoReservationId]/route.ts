import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  console.log(reservationId);
  const reservation = await prisma.reservation_todo.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { todo: { userId: currentUser.id } }
      ]
    }
  });

  return NextResponse.json(reservation);
}
