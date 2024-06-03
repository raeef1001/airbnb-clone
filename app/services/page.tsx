
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import Services_Client from "./Services_client";
import getTodos from "../actions/getTodos";
import getRestaurants from "../actions/getRestaurants";

const ServicesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  const listings = await getListings({ userId: currentUser.id });
  const todos = await getTodos({ userId: currentUser.id });
  const restaurant = await getRestaurants({ userId: currentUser.id });
  
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No services found"
          subtitle="Looks like you have no services."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Services_Client
        todo = {todos}
        restaurant = {restaurant}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ServicesPage;
