import { useEffect } from "react";
import { useUser } from "./useUser.js";
import { useNavigate } from "react-router";
import { api } from "../../service/api.js";

function ProtectedRoutes({ children }) {
  const { user, isPending } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !user) {
      navigate("/login");
    }
  }, [user, isPending, navigate]);

  useEffect(() => {
    const logoutInterceptor = async (data) => {
      if (user && data.response.status === 401) {
        navigate("/login");
      }
      return data;
    };
    api.addResponseInterceptor(logoutInterceptor);

    return () => {
      api.removeResponseInterceptor(logoutInterceptor);
    };
  }, [navigate, user]);

  if (isPending) {
    return null;
  }

  return user && children;
}

export default ProtectedRoutes;
