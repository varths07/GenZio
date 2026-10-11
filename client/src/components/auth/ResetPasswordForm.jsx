import { useState } from "react";
import "./ResetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Demo success message
    setMessage(
      "If an account exists with this email, a password reset link will be sent."
    );
  };

  return (
    <div className="reset-page">
      <div className="reset-card">

        {/* Logo / Brand */}
        <div className="brand">
          MEN'S FASHION
        </div>

        {/* Icon */}
        <div className="reset-icon">
          🔐
        </div>

        <h1>Reset Password</h1>

        <p className="reset-description">
          Enter the email address associated with your account.
          We'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <span>✉️</span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setMessage("");
                }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {/* Button */}
          <button type="submit" className="reset-button">
            Send Reset Link
          </button>

        </form>

        {/* Back to Login */}
        <p className="back-login">
          Remember your password?
          <a href="/login"> Back to Login</a>
        </p>

      </div>
    </div>
  );
}

export default ResetPassword;