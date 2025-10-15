import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { api } from "../../service/api.js";

export function useBooking() {
  const {bookingId} = useParams();

  const { data, isPending, error} = useQuery({
    queryKey: ["bookings", "detail", bookingId],
    queryFn: () => api.get(`/bookings/${bookingId}`),
    retry: false,
  });
  
  return {
    booking: data,
    isPending,
    error,
  };
}
