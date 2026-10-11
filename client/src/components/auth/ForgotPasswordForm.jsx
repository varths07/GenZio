import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace this with your backend API later
    alert(`Password reset link has been sent to ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#070709] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111114] border border-gray-800 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-gray-400 text-center mb-8">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-300 mb-2">
              Email Address
            </label>

            <div className="flex items-center bg-[#1b1b1f] rounded-xl px-4 border border-gray-700">
              <Mail className="text-gray-400 w-5 h-5" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent p-3 text-white outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition"
          >
            Send Reset Link
          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>

        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordForm;