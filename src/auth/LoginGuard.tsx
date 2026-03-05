import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useCurrentUser } from "@/lib/querykeys/current-user-query";
import logoImg from "@/assets/logo2.webp";

const LoadingScreen = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-secondary-main">
    <img
      src={logoImg}
      alt="Logo"
      className="w-18 h-18 opacity-95"
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

    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="animate-spin">
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2.5" className="text-muted" />
      <path
        d="M14 3 A11 11 0 0 1 25 14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-foreground"
      />
    </svg>
  </div>
);

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
    return <LoadingScreen />;
  }

  if (isError || !user) {
    return <Outlet />;
  }

  return <Navigate to="/dashboard/overview" replace />;
};

export default LoginGuard;