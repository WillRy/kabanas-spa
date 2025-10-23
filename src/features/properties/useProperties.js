import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { api } from "../../service/api.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useProperties() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") ?? "all";

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = useMemo(() => ({
    field,
    direction,
  }), [field, direction]);

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  console.log(page);

  const { data: properties, isPending, error } = useQuery({
    queryKey: ["properties", filterValue, sortBy, page],
    queryFn: () => {
      return api.get(
        `/property?page=${page}&limit=10&sortBy=${sortBy.field}&sortOrder=${sortBy.direction}&discount=${filterValue}`
      );
    },
  });

  const pageCount = Math.ceil(properties?.data?.total / 10) || 0;

  // Prefetch logic moved to useEffect to avoid race conditions
  useEffect(() => {
    if (pageCount && page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["properties", filterValue, sortBy, page + 1],
        queryFn: () => {
          return api.get(
            `/property?page=${page + 1}&limit=10&sortBy=${
              sortBy.field
            }&sortOrder=${sortBy.direction}&discount=${filterValue}`
          );
        },
      });
    }

    if (page > 1 && pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["properties", filterValue, sortBy, page - 1],
        queryFn: () => {
          return api.get(
            `/property?page=${page - 1}&limit=10&sortBy=${
              sortBy.field
            }&sortOrder=${sortBy.direction}&discount=${filterValue}`
          );
        },
      });
    }
  }, [queryClient, page, pageCount, filterValue, sortBy, sortBy.field, sortBy.direction]);

  return { properties, isPending, error, total: properties?.data?.total || 0 };
}
