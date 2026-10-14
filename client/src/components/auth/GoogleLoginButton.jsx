import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../../supabase";

export default function GoogleLoginButton() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (oauthError) throw oauthError;
    } catch (oauthError) {
      console.error("Google sign-in failed:", oauthError);
      setError(oauthError.message || "Unable to start Google sign-in.");
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <p role="alert" className="mb-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex min-h-11 w-full items-center justify-center gap-3 border border-[#cfc8ba] bg-[#f4f1ea] text-sm text-[#20201d] transition-colors hover:border-[#555c45] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FcGoogle size={20} aria-hidden="true" />
        {loading ? "Connecting..." : "Continue with Google"}
      </button>
    </>
  );
}
