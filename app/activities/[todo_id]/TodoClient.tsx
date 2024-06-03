'use client';
// @ts-ignore
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeTodo, SafeTodoReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import TodoHead from "@/app/components/todo/TodoHead";
import TodoInfo from "@/app/components/todo/TodoInfo";
import TodoReservation from "@/app/components/todo/TodoReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  Reservation_todo?: SafeTodoReservation[];
  Todo: SafeTodo & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const TodoClient: React.FC<ListingClientProps> = ({ 
    Reservation_todo = [], 
    Todo, 
    currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    Reservation_todo.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [Reservation_todo]);

  // const category = useMemo(() => {
  //    return categories.find((items) => 
  //     items.label === Todo.category);
  // }, [Todo.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(Todo.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post('/api/todoReservation', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        todo_id: Todo?.id
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
    Todo?.id,
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
      
      if (dayCount && Todo.price) {
        setTotalPrice(dayCount * Todo.price);
      } else {
        setTotalPrice(Todo.price);
      }
    }
  }, [dateRange, Todo.price]);

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
            title={Todo.title}
            imageSrc={Todo.imageSrc}
            locationValue={Todo.locationValue}
            id={Todo.id}
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
            <TodoInfo
              user={Todo.user}
              category={category}
              description={Todo.description}
            
              guestCount={Todo.guestCount}
            
              locationValue={Todo.locationValue}
            />
            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <TodoReservation
                price={Todo.price}
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
 
export default TodoClient;
