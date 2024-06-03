
// @ts-ignore 
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./TripsClient";
import Trips_activity from "./Trips_activity";
import getTodoReservation from "../actions/getTodoReservation";
import Trips_restaurant from "./Trips_restaurant";
import getRestaurantReservation from "../actions/getRestaurantReservation";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });
  const reservation_todo = await getTodoReservation({ userId: currentUser.id });
 const reservation_restaurant = await getRestaurantReservation({ userId: currentUser.id });
  if (reservations.length === 0 && reservation_todo.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="mt-[6%]">
        
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />

      <Trips_activity
        reservations={reservation_todo}
        currentUser={currentUser}
      />

      <Trips_restaurant
        reservations={reservation_restaurant}
        currentUser={currentUser}
      />
      </div>
     
    </ClientOnly>
  );
}
 
export default TripsPage;
