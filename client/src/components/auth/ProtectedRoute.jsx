
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { useShop } from "../../context/ShopContext";

export default function ProtectedRoute({ children, adminOnly = true }) {
  const [status, setStatus] = useState("checking");
  const { user, authLoading, authError } = useShop();

  useEffect(() => {
    let active = true;

    async function checkAdmin() {
      if (authLoading) return;

      if (authError) {
        setStatus("error");
        return;
      }

      if (!user) {
        setStatus("unauthenticated");
        return;
      }

      if (!adminOnly) {
        setStatus("authorized");
        return;
      }

      setStatus("checking");
      try {
        const { data: isAdmin, error: adminError } =
          await supabase.rpc("is_admin");

        if (adminError) throw adminError;

        if (active) {
          setStatus(isAdmin === true ? "authorized" : "unauthorized");
        }
      } catch (error) {
        console.error("Admin access check failed:", error);

        if (active) setStatus("error");
      }
    }

    checkAdmin();

    return () => {
      active = false;
    };
  }, [adminOnly, authError, authLoading, user]);

  if (status === "checking") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        {adminOnly ? "Verifying admin access..." : "Checking your session..."}
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (status === "unauthorized") {
    return <Navigate to="/" replace />;
  }

  if (status === "error") {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <p>{authError || "Unable to verify admin access."}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded bg-indigo-600 px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  return children;
}
