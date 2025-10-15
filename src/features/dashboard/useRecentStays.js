import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router";
import { getStaysAfterDate } from "../../services/apiBookings.js";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isPending } = useQuery({
    queryKey: ["bookings", "stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter((stay) => ['checked-in', 'checked-out'].includes(stay.status));

  return { stays, confirmedStays, numDays, isPending };
}
