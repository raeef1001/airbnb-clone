'use client';
// @ts-ignore 
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeTodoReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import TodoCard from "../components/todo/TodoCard";

interface TripsClientProps {
  reservations: SafeTodoReservation[],
  currentUser?: SafeUser | null,
}

const Trips_activity: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/todoReservation/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
      console.log(error);
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <Container>
     
      <div 
        className="
          mt-10
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
        {reservations.map((reservation: any) => (
          <TodoCard
            key={reservation.id}
            data={reservation.todo}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default Trips_activity;