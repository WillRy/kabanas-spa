import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { api } from "../../service/api.js";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }) => {
      return api.put(`/bookings/${bookingId}/check-out`);
    },
    onSuccess: (data) => {
      toast.success(`Booking #${data.data.id} successfully checked out`);

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkout, isCheckingOut };
}
