import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useErrorNavigate(error, url) {
  const navigate = useNavigate();
  useEffect(() => {
    const message = error?.data?.message || error?.message;

    if(!error) return;

    toast.error(message, {
        id: message
    });
    navigate(url);
  }, [error, url, navigate]);
}
