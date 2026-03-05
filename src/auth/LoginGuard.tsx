import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useCurrentUser } from "@/lib/querykeys/current-user-query";

const LoginGuard = () => {
  const hasCookie = Boolean(Cookies.get("mithaq-admin"));

  if (!hasCookie) {
    return <Outlet />;
  }

  return <LoginGuardInner />;
};

const LoginGuardInner = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  if (isError || !user) {
    return <Outlet />;
  }

  return <Navigate to="/dashboard/overview" replace />;
};

export default LoginGuard;