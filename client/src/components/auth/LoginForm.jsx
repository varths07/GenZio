
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import GoogleLoginButton from "./GoogleLoginButton";
import { supabase } from "../../supabase";

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const temp = {};

    if (!formData.email.trim()) {
      temp.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email.trim()
      )
    ) {
      temp.email = "Invalid email address";
    }

    if (!formData.password) {
      temp.password = "Password is required";
    } else if (formData.password.length < 6) {
      temp.password = "Minimum 6 characters";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      // Supabase manages the authentication session.
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border border-yellow-500/20 bg-[#111] p-8 shadow-2xl">
      <h2 className="mb-2 text-center text-4xl font-bold text-yellow-400">
        Welcome Back
      </h2>

      <p className="mb-8 text-center text-gray-400">
        Sign in to continue shopping
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Email
          </label>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-yellow-400" />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className={`w-full rounded-xl bg-black py-3 pl-12 pr-4 text-white outline-none transition ${
                errors.email
                  ? "border border-red-500"
                  : "border border-gray-700 focus:border-yellow-400"
              }`}
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-sm text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Password
          </label>

          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-yellow-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className={`w-full rounded-xl bg-black py-3 pl-12 pr-12 text-white outline-none transition ${
                errors.password
                  ? "border border-red-500"
                  : "border border-gray-700 focus:border-yellow-400"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-3.5 text-gray-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-yellow-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
            loading
              ? "cursor-not-allowed bg-yellow-300 text-black"
              : "bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-[1.02]"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              Logging In...
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-gray-700" />
        <span className="px-4 text-sm text-gray-400">OR</span>
        <div className="h-px flex-1 bg-gray-700" />
      </div>

      <GoogleLoginButton />

      <p className="mt-8 text-center text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-yellow-400 hover:text-yellow-300"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
