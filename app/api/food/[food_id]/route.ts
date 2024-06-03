import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  todo_id?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { todo_id } = params;

  if (!todo_id || typeof todo_id !== 'string') {
    throw new Error('Invalid ID');
  }

  const todo = await prisma.restaurant.deleteMany({
    where: {
      id: todo_id,
      userId: currentUser.id
    }
  });

  return NextResponse.json(todo);
}
