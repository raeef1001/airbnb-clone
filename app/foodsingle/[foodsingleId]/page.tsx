import getCurrentUser from "@/app/actions/getCurrentUser";
import getRestaurantById from "@/app/actions/getRestaurantById";
import getRestaurantReservation from "@/app/actions/getRestaurantReservation";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import FoodsingleClient from "./FoodsingleClient";

interface IParams {
  restaurant_id?: string;
}

const FoodsinglePage = async ({ params }: { params: IParams }) => {
  const listing = await getRestaurantById(params);
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
};

export default FoodsinglePage;
