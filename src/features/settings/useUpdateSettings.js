import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api.js";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationFn: async (data) => {
      return api.put("/setting", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
        
      toast.error(error?.body?.message ?? "Error updating settings");
    },
  });

    return {
        updateSettings: mutate,
        isUpdating: isPending
    }
}
