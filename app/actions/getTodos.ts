import prisma from "@/app/libs/prismadb";

export interface ITodoParams {
    userId?: string;
    guestCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getTodos(
    params: ITodoParams
) {
    try {
        const {
            userId,
            guestCount,
            locationValue,
            startDate,
            endDate,
            category,
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }



        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }



        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const todos = await prisma.todo.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = todos.map((todo) => ({
            ...todo,
            createdAt: todo.createdAt.toISOString(),
        }));

        return todos;
    } catch (error: any) {
        throw new Error(error);
    }
}
