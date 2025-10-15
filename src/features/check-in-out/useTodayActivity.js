import { useQuery } from "@tanstack/react-query";
import { api } from "../../service/api.js";

export function useTodayActivity() {
  const { data: activities, isPending } = useQuery({
    queryKey: ["bookings", "today-activity"],
    queryFn: () => api.get('/bookings/today-activity'),
  });

  return { activities, isPending };
}
