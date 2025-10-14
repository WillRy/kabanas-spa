import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api.js";
import toast from "react-hot-toast";

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/property/${id}`);
    },
    onSuccess: () => {
      toast.success("Property deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error) => {
      console.log(error);
      const message =
        error?.body?.message ||
        "An error occurred while deleting the property.";
      toast.error(message);
    },
  });

  return {
    deleteProperty: mutate,
    isDeletingProperty: isPending,
  };
}
