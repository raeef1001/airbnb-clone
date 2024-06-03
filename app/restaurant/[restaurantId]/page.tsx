
// @ts-ignore 
import getCurrentUser from "@/app/actions/getCurrentUser";
import getTodoById from "@/app/actions/getTodoById";
import getTodoReservation from "@/app/actions/getTodoReservation";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import RestaurantClient from "./RestaurantClient";
import getRestaurantById from "@/app/actions/getRestaurantById";
import getRestaurantReservation from "@/app/actions/getRestaurantReservation";

interface IParams {
  restaurant_id?: string;
}

const RestaurantPage = async ({params}) => {

  const listing = await getRestaurantById({ params: params });
  const reservations = await getRestaurantReservation({ params: params});
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <RestaurantClient
      Restaurant_Reservation={reservations}
      Restaurant={listing}
        
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default RestaurantPage;
