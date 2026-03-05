import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useCurrentUser } from "@/lib/querykeys/current-user-query";

const AuthGuard = () => {
  const hasCookie = Boolean(Cookies.get("mithaq-admin"));

  if (!hasCookie) {
    return <Navigate to="/login" replace />;
  }

  return <AuthGuardInner />;
};

const AuthGuardInner = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;