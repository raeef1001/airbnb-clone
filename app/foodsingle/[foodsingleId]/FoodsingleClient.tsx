'use client';
// @ts-ignore
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeRestaurant, SafeRestaurantReservation, SafeTodo, SafeTodoReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import TodoHead from "@/app/components/todo/TodoHead";
import TodoInfo from "@/app/components/todo/TodoInfo";
import TodoReservation from "@/app/components/todo/TodoReservation";
import RestaurantInfo from "@/app/components/restaurant/RestaurantInfo";
import RestaurantReservation from "@/app/components/restaurant/RestaurantReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  restaurant_reservation?: SafeRestaurantReservation[];
  restaurant: SafeRestaurant & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const FoodsingleClient: React.FC<ListingClientProps> = ({ 
    restaurant_reservation = [], 
    restaurant, 
    currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    restaurant_reservation.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [restaurant_reservation]);

  // const category = useMemo(() => {
  //    return categories.find((items) => 
  //     items.label === Todo.category);
  // }, [Todo.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(restaurant.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post('/api/resturantreservation', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        todo_id: restaurant?.id
      })
      .then(() => {
        toast.success('activity reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [
    totalPrice, 
    dateRange, 
    restaurant?.id,
    router,
    currentUser,
    loginModal
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && restaurant.price) {
        setTotalPrice(dayCount * restaurant.price);
      } else {
        setTotalPrice(restaurant.price);
      }
    }
  }, [dateRange, restaurant.price]);

  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto mt-[6%]
        "
      >
        <div className="flex flex-col gap-6">
          <TodoHead
            title={restaurant.title}
            imageSrc={restaurant.imageSrc}
            locationValue={restaurant.locationValue}
            id={restaurant.id}
            currentUser={currentUser}
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <RestaurantInfo
              user={restaurant.user}
              
              description={restaurant.description}
            
              guestCount={restaurant.guestCount}
            
              locationValue={restaurant.locationValue}
            />
            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <RestaurantReservation
                price={restaurant.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default FoodsingleClient;
