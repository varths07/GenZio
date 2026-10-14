import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabase";
import GoogleLoginButton from "../../components/auth/GoogleLoginButton";
import { useShop } from "../../context/ShopContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { user, authLoading } = useShop();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [authLoading, user, navigate]);

  if (authLoading || user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#f4f1ea] px-4 text-sm text-[#514b42]">
        {authLoading ? "Checking your session..." : "Redirecting..."}
      </div>
    );
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.session || !data.user) {
        throw new Error("Login succeeded, but no session was created.");
      }

      setSuccessMessage("Login successful!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "w-full rounded-none border border-[#cfc8ba] !bg-[#f4f1ea] px-4 py-3 !text-[#20201d] placeholder:!text-[#817b70] caret-[#20201d] outline-none focus:border-[#555c45] focus:ring-2 focus:ring-[#555c45]/20";

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#f4f1ea] px-5 py-12">
      <div className="w-full max-w-md border border-[#d7d1c6] bg-[#eeebe4] p-6 sm:p-9">
        <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#817b70]">
          Your GenZio account
        </p>
        <h1 className="mb-2 text-center font-serif text-4xl text-[#20201d]">
          Welcome back
        </h1>

        <p className="mb-6 text-center text-sm text-[#69655d]">
          Sign in to your GenZio account
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="mb-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="mb-4 border border-green-200 bg-green-50 p-3 text-sm text-green-800"
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-[#514b42]"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className={inputClassName}
              style={{
                color: "#000000",
                WebkitTextFillColor: "#000000",
                backgroundColor: "#ffffff",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium text-[#514b42]"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className={inputClassName}
              style={{
                color: "#000000",
                WebkitTextFillColor: "#000000",
                backgroundColor: "#ffffff",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#20201d] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] transition hover:bg-[#45483b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#d7d1c6]" />
          <span className="text-xs text-[#817b70]">OR</span>
          <div className="h-px flex-1 bg-[#d7d1c6]" />
        </div>

        <GoogleLoginButton />

        <p className="mt-6 text-center text-sm text-[#69655d]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#555c45] underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}