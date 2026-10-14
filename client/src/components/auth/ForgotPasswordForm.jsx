import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { supabase } from "../../supabase";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error: requestError } =
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
      if (requestError) throw requestError;
      setMessage(
        "If an account exists for this address, Supabase will send a password reset link."
      );
    } catch (requestError) {
      console.error("Password reset request failed:", requestError);
      setError(
        requestError.message || "Unable to request a password reset right now."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f1ea] px-5 py-12">
      <section className="w-full max-w-md border border-[#d7d1c6] bg-[#eeebe4] p-6 sm:p-9">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.18em] text-[#817b70]">
          Account support
        </p>
        <h1 className="text-center font-serif text-4xl">Forgot password?</h1>
        <p className="mt-3 text-center text-sm leading-6 text-[#69655d]">
          Enter your email address and we’ll request a reset link from the
          account service.
        </p>

        {error && (
          <p role="alert" className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="mt-5 border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label htmlFor="reset-email" className="block text-xs font-medium">
            Email address
          </label>
          <div className="flex min-h-11 items-center gap-3 border border-[#cfc8ba] px-3">
            <Mail className="h-4 w-4 text-[#817b70]" aria-hidden="true" />
            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="min-h-11 w-full bg-[#20201d] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] transition-colors hover:bg-[#45483b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Requesting..." : "Request reset link"}
          </button>
        </form>

        <Link
          to="/login"
          className="mt-6 inline-flex items-center text-xs font-medium text-[#555c45] underline-offset-4 hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to sign in
        </Link>
      </section>
    </main>
  );
};

export default ForgotPasswordForm;
