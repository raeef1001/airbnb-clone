import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getTodos, { 
  ITodoParams
} from "@/app/actions/getTodos";
import getRestaurants, { 
  ITodoParams as ITodoParamss
} from "@/app/actions/getRestaurants";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import TodoCard from "./components/todo/TodoCard";

import RestaurantCard from "./components/restaurant/RestaurantCard";

interface HomeProps {
  searchParams: IListingsParams,
  
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const todos = await getTodos({} as ITodoParams);
  const Restaurants = await getRestaurants({} as ITodoParamss);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
        <div className="pt-24 text-4xl font-bold mb-2">Things To Do</div>
        <div>Find best ways to treat your tour
        </div>
        <div 
          className="
            pt-12 
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {todos.map((listing: any) => (
            <TodoCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
        <div className="pt-24 text-4xl font-bold mb-2">Find your perfect restaurant</div>
        <div>Find best food in your city
        </div>
        <div 
          className="
            pt-12 
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {Restaurants.map((listing: any) => (
            <RestaurantCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
        <div className="pt-24 text-4xl font-bold mb-2">Ways to tour Your City</div>
        <div>Book these experiences for a close-up look at those City.
        </div>
        <div 
          className="
            pt-12 
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
        
      </Container>
    </ClientOnly>
  )
}

export default Home;
