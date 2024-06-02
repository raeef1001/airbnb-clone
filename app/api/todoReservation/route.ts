import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    todo_id,
    startDate,
    endDate,
    totalPrice
   } = body;

   if (!todo_id || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.todo.update({
    where: {
      id: todo_id
    },
    data: {
      reservation_todos: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        }
      }
    }
  });

  return NextResponse.json(listingAndReservation);
}
