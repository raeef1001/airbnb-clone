import { Listing, Reservation,Restaurant,Restaurant_reservation, Reservation_todo, Todo, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
export type SafeTodo = Omit<Todo, "createdAt"> & {
  createdAt: string;
};
export type SafeRestaurant = Omit<Restaurant, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
export type SafeTodoReservation = Omit<
Reservation_todo, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  todo: SafeTodo;
};
export type SafeRestaurantReservation = Omit<
Restaurant_reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  todo: SafeTodo;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
