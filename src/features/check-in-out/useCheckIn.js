import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { api } from "../../service/api.js";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, ...breakfast }) => {
      return api.put(`/bookings/${bookingId}/check-in`, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess: (data) => {
      toast.success(`Booking #${data.data.id} successfully checked in`);

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      navigate(`/dashboard`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkin, isCheckingIn };
}
