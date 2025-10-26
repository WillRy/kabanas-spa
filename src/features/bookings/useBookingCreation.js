import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api.js";
import toast from "react-hot-toast";

export function useBookingCreation() {
    const queryClient = useQueryClient();
    const {mutate, isPending, error} = useMutation({
        mutationFn: (data) => {
            return api.post("/bookings", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["bookings"]});
            toast.success("Booking created successfully");
        },
        onError: (error) => {
            toast.error(error?.data?.message || "Failed to create booking");
        }
    })

    return {createBooking: mutate, isCreating: isPending, error};
}