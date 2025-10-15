import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { api } from "../../service/api.js";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  const {data, isPending} = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => api.get('/bookings/stats?last=' + numDays),
  });

  return { data, isPending, numDays };
}
