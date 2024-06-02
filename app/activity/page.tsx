
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import getListings, { 
    IListingsParams
  } from "@/app/actions/getListings";
import ActivityClient from "./ActivityClient";
import getTodos, { 
    ITodoParams
  } from "@/app/actions/getTodos";
  interface HomeProps {
    searchParams: IListingsParams,
    
  };
const ListingPage = async ({ searchParams }: HomeProps) => {
    const listings =  await getTodos({} as ITodoParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Hotels found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ActivityClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;
