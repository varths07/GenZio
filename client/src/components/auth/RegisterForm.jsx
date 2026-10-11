import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { useShop } from "../../context/ShopContext";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { user, authLoading } = useShop();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    profilePicture: null,
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [authLoading, user, navigate]);

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        {authLoading ? "Checking your session..." : "Redirecting..."}
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });

    setSuccess("");
    setError("");
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const mobileValid = /^[0-9]{10}$/.test(form.mobile);

  const pincodeValid = /^[0-9]{6}$/.test(form.pincode);

  const passwordsMatch =
    form.password !== "" &&
    form.password === form.confirmPassword;

  const passwordStrength = () => {
    if (form.password.length === 0) return "";

    if (form.password.length < 6) return "Weak";

    if (
      form.password.length >= 8 &&
      /[A-Z]/.test(form.password) &&
      /[0-9]/.test(form.password) &&
      /[^A-Za-z0-9]/.test(form.password)
    ) {
      return "Strong";
    }

    return "Medium";
  };

  const requiredFieldsValid =
    form.fullName.trim() !== "" &&
    emailValid &&
    mobileValid &&
    form.password.length >= 6 &&
    passwordsMatch &&
    form.address.trim() !== "" &&
    form.city.trim() !== "" &&
    form.state !== "" &&
    pincodeValid &&
    form.terms;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!requiredFieldsValid) return;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email.trim().toLowerCase(),
        password: form.password,
        options: {
          data: {
            full_name: form.fullName.trim(),
            mobile: form.mobile,
            address: form.address.trim(),
            city: form.city.trim(),
            state: form.state,
            pincode: form.pincode,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.session) {
        navigate("/profile", { replace: true });
      } else {
        setSuccess("Account created. Check your email to confirm your account, then sign in.");
      }
    } catch (submitError) {
      setError(submitError.message || "Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        {/* Left Section */}
        <div className="register-banner">
          <div>
            <p className="brand-small">MEN'S FASHION</p>

            <h1>
              Style Starts
              <br />
              With You.
            </h1>

            <p>
              Create your account and discover the latest
              collection of premium men's fashion and footwear.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="register-form-section">

          <h2>Create Account</h2>

          <p className="subtitle">
            Join us and start shopping your favorite styles.
          </p>

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="input-group">
              <label>Full Name *</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
              />

              {form.fullName === "" && (
                <small>Enter your full name</small>
              )}
            </div>

            {/* Email */}
            <div className="input-group">
              <label>Email Address *</label>

              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
              />

              {form.email && !emailValid && (
                <small className="error">
                  Enter a valid email address
                </small>
              )}
            </div>

            {/* Mobile */}
            <div className="input-group">
              <label>Mobile Number *</label>

              <input
                type="tel"
                name="mobile"
                placeholder="10-digit mobile number"
                value={form.mobile}
                onChange={handleChange}
                maxLength="10"
              />

              {form.mobile && !mobileValid && (
                <small className="error">
                  Enter a valid 10-digit mobile number
                </small>
              )}
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password *</label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {form.password && (
                <small
                  className={
                    passwordStrength() === "Strong"
                      ? "strong"
                      : passwordStrength() === "Medium"
                      ? "medium"
                      : "weak"
                  }
                >
                  Password strength: {passwordStrength()}
                </small>
              )}
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label>Confirm Password *</label>

              <div className="password-box">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {form.confirmPassword && !passwordsMatch && (
                <small className="error">
                  Passwords do not match
                </small>
              )}
            </div>

            {/* Address */}
            <div className="input-group">
              <label>Address *</label>

              <textarea
                name="address"
                placeholder="Enter your address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            {/* City + State */}
            <div className="two-columns">

              <div className="input-group">
                <label>City *</label>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>State *</label>

                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  <option>Tamil Nadu</option>
                  <option>Kerala</option>
                  <option>Karnataka</option>
                  <option>Andhra Pradesh</option>
                  <option>Telangana</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Gujarat</option>
                  <option>West Bengal</option>
                  <option>Rajasthan</option>
                </select>
              </div>

            </div>

            {/* Pincode */}
            <div className="input-group">
              <label>Pincode *</label>

              <input
                type="text"
                name="pincode"
                placeholder="6-digit pincode"
                value={form.pincode}
                onChange={handleChange}
                maxLength="6"
              />

              {form.pincode && !pincodeValid && (
                <small className="error">
                  Enter a valid 6-digit pincode
                </small>
              )}
            </div>

            {/* Profile Picture */}
            <div className="input-group">
              <label>Profile Picture (Optional)</label>

              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            {/* Terms */}
            <div className="terms">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />

              <label>
                I agree to the{" "}
                <span>Terms & Conditions</span> and{" "}
                <span>Privacy Policy</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="register-button"
              disabled={!requiredFieldsValid || loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="login-link">
            Already have an account?
            <a href="/login"> Login</a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;