import { useQuery } from "@tanstack/react-query";
import { api } from "../../service/api.js";

export function useUser() {
  const { data, isPending } = useQuery({
    queryKey: ["user"], //chave unica para identificar a query
    queryFn: async () => {
      return api.get("/user");
    },
    retry: false,
  });

  return {
    user: data,
    isPending,
  };
}
