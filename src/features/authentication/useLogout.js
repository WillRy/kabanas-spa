import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api.js";
import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return api.post("/logout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/login");
    },
  });

  return {
    logout: mutate,
    isPending,
  };
}
