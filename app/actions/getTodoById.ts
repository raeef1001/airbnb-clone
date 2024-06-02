// @ts-ignore 
import prisma from "@/app/libs/prismadb";

interface IParams {
  todo_id?: string;
}

export default async function getTodoById(
  { params }
) {
  try {
    const { todo_id } = params;

    const todo = await prisma.todo.findUnique({
      where: {
        id: todo_id,
      },
      include: {
        user: true
      }
    });

    if (!todo) {
      return null;
    }

    return {
      ...todo,
      createdAt: todo.createdAt.toString(),
      user: {
        ...todo.user,
        createdAt: todo.user.createdAt.toString(),
        updatedAt: todo.user.updatedAt.toString(),
        emailVerified: 
          todo.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
