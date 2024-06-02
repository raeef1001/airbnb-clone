import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  restaurant_id?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { restaurant_id } = params;

  if (!restaurant_id || typeof restaurant_id !== 'string') {
    throw new Error('Invalid ID');
  }

  const restaurant = await prisma.restaurant.deleteMany({
    where: {
      id: restaurant_id,
      userId: currentUser.id
    }
  });

  return NextResponse.json(restaurant);
}
