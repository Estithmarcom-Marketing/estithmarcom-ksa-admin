import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useCurrentUser } from "@/lib/querykeys/current-user-query";
import logoImg from "@/assets/logo2.png";
import InfinitySpinner from "@/components/infinity-spinner";

const LoadingScreen = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-secondary-main">
    <img
      src={logoImg}
      alt="Logo"
      className="w-18 opacity-95"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
        const fallback = document.getElementById("logo-fallback");
        if (fallback) fallback.style.display = "block";
      }}
    />
    <span
      id="logo-fallback"
      className="hidden text-2xl font-bold tracking-tight text-foreground"
    >
      Mithaq
    </span>

    <InfinitySpinner />
  </div>
);

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
    return <LoadingScreen />;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;