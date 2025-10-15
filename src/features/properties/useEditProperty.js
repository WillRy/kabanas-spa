import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api.js";
import toast from "react-hot-toast";

export default function useEditProperty() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }) => {
      return api.post(`/property/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      toast.success("Property updated successfully");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error) => {
      const message =
        error?.data?.message ||
        "An error occurred while updating the property.";
      toast.error(message);
    },
  });

  return {
    editProperty: mutate,
    isEditingProperty: isPending,
  };
}
