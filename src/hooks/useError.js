import { useEffect } from "react";
import toast from "react-hot-toast";

export function useError(error) {

    useEffect(() => {
        if(!error) return;

        toast.error(error?.data?.message || error?.message);
    }, [error])
}