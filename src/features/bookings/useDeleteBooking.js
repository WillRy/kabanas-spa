import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api.js";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (bookingId) => {
      return api.delete(`/bookings/${bookingId}`);
    },
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      const message =
        error?.data?.message || "An error occurred while deleting the booking.";
      toast.error(message);
    },
  });

  return {
    deleteBooking: mutate,
    isDeletingBooking: isPending,
  };
}
