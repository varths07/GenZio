import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../../supabase";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Use a password with at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) throw updateError;

      setMessage("Your password has been updated.");
      navigate("/login", { replace: true });
    } catch (updateError) {
      console.error("Password update failed:", updateError);
      setError(
        updateError.message ||
          "Unable to update your password. Request a new reset link and try again."
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
        <h1 className="text-center font-serif text-4xl">Set a new password</h1>
        <p className="mt-3 text-center text-sm leading-6 text-[#69655d]">
          Open this page from the password reset link sent to your email.
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
          <label className="block text-xs font-medium">
            New password
            <input
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 min-h-11 w-full border border-[#cfc8ba] bg-transparent px-3 text-sm outline-none focus:border-[#555c45] focus:ring-2 focus:ring-[#555c45]/20"
            />
          </label>
          <label className="block text-xs font-medium">
            Confirm new password
            <input
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-2 min-h-11 w-full border border-[#cfc8ba] bg-transparent px-3 text-sm outline-none focus:border-[#555c45] focus:ring-2 focus:ring-[#555c45]/20"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="min-h-11 w-full bg-[#20201d] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] transition-colors hover:bg-[#45483b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update password"}
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

export default ResetPasswordForm;
