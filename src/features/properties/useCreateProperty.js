import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api.js";
import toast from "react-hot-toast";

export function useCreateProperty() {
    const queryClient = useQueryClient();   
    const {mutate, isPending} = useMutation({
        mutationFn: async (data) => {
            return api.post("/property", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        },
        onSuccess: () => {
            toast.success("Property created successfully");
            queryClient.invalidateQueries({queryKey: ["properties"]});
        },
        onError: (error) => {
            console.log(error);
            const message = error?.body?.message || "An error occurred while creating the property.";
            toast.error(message);
        }
    })

    return {
        createProperty: mutate,
        isCreatingProperty: isPending
    }
}