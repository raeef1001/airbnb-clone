
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import RestaurantClient from "./restaurantClient";
import getListings, { 
    IListingsParams
  } from "@/app/actions/getListings";
import getRestaurants from "../actions/getRestaurants";
  interface HomeProps {
    searchParams: IListingsParams,
    
  };
const ListingPage = async ({ searchParams }: HomeProps) => {
    const listings = await getRestaurants(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No restaurants found"
          subtitle=""
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <RestaurantClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;
