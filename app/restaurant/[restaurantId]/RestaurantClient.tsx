'use client';

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
  Restaurant_Reservation?: SafeRestaurantReservation[];
  Restaurant: SafeRestaurant & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const RestaurantClient: React.FC<ListingClientProps> = ({ 
    Restaurant_Reservation = [], 
    Restaurant, 
    currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    Restaurant_Reservation.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [Restaurant_Reservation]);

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === Restaurant.title);
  }, [Restaurant.title]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(Restaurant.price);
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
        Restaurant_id: Restaurant?.id
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
    Restaurant?.id,
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
      
      if (dayCount && Restaurant.price) {
        setTotalPrice(dayCount * Restaurant.price);
      } else {
        setTotalPrice(Restaurant.price);
      }
    }
  }, [dateRange, Restaurant.price]);

  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <TodoHead
            title={Restaurant.title}
            imageSrc={Restaurant.imageSrc}
            locationValue={Restaurant.locationValue}
            id={Restaurant.id}
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
              user={Restaurant.user}
              category={category}
              description={Restaurant.description}
            
              guestCount={Restaurant.guestCount}
            
              locationValue={Restaurant.locationValue}
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
                price={Restaurant.price}
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
 
export default RestaurantClient;
