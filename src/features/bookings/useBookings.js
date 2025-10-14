import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api.js";
import { useSearchParams } from "react-router";
import { useEffect, useMemo } from "react";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("status") || "all";

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = useMemo(() => ({
    field,
    direction,
  }), [field, direction]);

  const { data: bookings, isPending } = useQuery({
    queryKey: ["bookings", filter, page, sortBy],
    queryFn: async () => {
      return api.get(
        `/bookings?page=${page}&status=${filter}&sortBy=${sortBy.field}&sortOrder=${sortBy.direction}`
      );
    },
  });

  const pageCount = Math.ceil(bookings?.data?.total / 10) || 0;

  useEffect(() => {
    if (pageCount && page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, page + 1, sortBy],
        queryFn: async () => {
          return api.get(
            `/bookings?page=${page + 1}&status=${filter}&sortBy=${
              sortBy.field
            }&sortOrder=${sortBy.direction}`
          );
        },
      });
    }
    if (page > 1 && pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, page - 1, sortBy],
        queryFn: async () => {
          return api.get(
            `/bookings?page=${page - 1}&status=${filter}&sortBy=${
              sortBy.field
            }&sortOrder=${sortBy.direction}`
          );
        },
      });
    }
  }, [page, pageCount, filter, sortBy, queryClient]);

  return {
    bookings: bookings?.data?.data || [],
    count: bookings?.data?.total || 0,
    isPending,
  };
}
