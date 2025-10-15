import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api.js";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const {mutate, isPending} = useMutation({
        mutationFn: async (data) => {
            return api.post("/profile", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["user"]});
            toast.success("User updated successfully");
        }
    })

    return {updateUser: mutate, isPending};
}