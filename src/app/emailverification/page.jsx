"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Email.css";

export default function EmailVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleContinueEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setShowOtpBox(true);
    setTimer(30);
    setError("");
  };

  const handleResendOtp = () => {
    setTimer(30); 
    setOtp("");
    setError("");
  };

  const handleVerifyOtp = () => {
    if (otp !== "1234") {
      setError("Wrong OTP; please retry");
      return;
    }
    router.push("/userdetails");
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: "url('/media/bg.jpg')" }}
    >
      <div className="auth-box">
        <h2>Welcome to Pehnawa</h2>
        <p>Let’s create your Partner Account to begin.</p>

        <label htmlFor="email">Enter Your Email ID</label>
        <input
          id="email"
          type="email"
          placeholder="admin@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={showOtpBox}
        />

        {!showOtpBox && (
          <p className="helper-text">
            This Email ID can be used by multiple members of your organization
          </p>
        )}

      
        {!showOtpBox && (
          <button onClick={handleContinueEmail} className="btn">
            Continue
          </button>
        )}

        {/* Step 2 → OTP Section */}
        {showOtpBox && (
          <>
            <div className="otp-group">
              <label htmlFor="otp">OTP</label>
              {timer > 0 ? (
                <span className="resend-text">Resend in {timer}s</span>
              ) : (
                <button
                  type="button"
                  className="resend-text"
                  onClick={handleResendOtp}
                >
                  Resend
                </button>
              )}
            </div>

            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {error && <p className="error-text">{error}</p>}


            <button onClick={handleVerifyOtp} className="btn">
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
