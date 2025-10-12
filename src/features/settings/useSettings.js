import { useQuery } from "@tanstack/react-query";
import { api } from "../../service/api.js";

export function useSettings() {
    const {data: settings, isPending} = useQuery({
        queryKey: ['settings'],
        queryFn: async () => {
            return api.get('/setting');
        }
    })

    return {
        settings,
        isPending
    }
}