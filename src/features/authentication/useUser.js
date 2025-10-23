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

  const hasPermission = (permission) => {
    return data?.data?.permissions?.includes(permission);
  }

  return {
    user: data,
    isPending,
    hasPermission
  };
}
