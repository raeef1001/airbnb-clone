
// @ts-ignore 
import getCurrentUser from "@/app/actions/getCurrentUser";
import getTodoById from "@/app/actions/getTodoById";
import getTodoReservation from "@/app/actions/getTodoReservation";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import Todoclient from "./TodoClient";

interface IParams {
  Todo_id?: string;
}

const ActivityPage = async ({params}) => {

  const listing = await getTodoById({ params: params });
  const reservations = await getTodoReservation({ params: params});
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
      <Todoclient
      Reservation_todo={reservations}
        Todo={listing}
        
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ActivityPage;
