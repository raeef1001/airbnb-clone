
// @ts-ignore 
import getCurrentUser from "@/app/actions/getCurrentUser";
import getTodoById from "@/app/actions/getTodoById";
import getTodoReservation from "@/app/actions/getTodoReservation";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import getrestauraById from "@/app/actions/getRestaurantById";
import getRestaurantReservation from "@/app/actions/getRestaurantReservation";
import FoodsingleClient from "./FoodsingleClient";

interface IParams {
  Todo_id?: string;
}

const FoodsinglePage = async ({ params }: { params: IParams }) => {
  console.log(params);
  const listing = await getrestauraById(params);
  const reservations = await getRestaurantReservation(params);
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
      <FoodsingleClient
      restaurant_reservation={reservations}
        restaurant={listing}
        
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default FoodsinglePage;
