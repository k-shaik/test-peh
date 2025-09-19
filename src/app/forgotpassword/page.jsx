"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import "./forgot.css";

export default function ForgotPassword() {
  const [mobile, setMobile] = useState("");
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

  const handleSendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
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
     router.push("/forgotpassword/reset");
  };
    return (
    <div
      className="auth-container"
      style={{ backgroundImage: "url('/media/bg.jpg')" }}
    >
      <div className="auth-box">
        <h2>Forgot Password</h2>
        <p>Let’s create your Password</p>

        
        <label htmlFor="mobile">Enter your Mobile number</label>
        <div className="input-group">
          <input
            id="mobile"
            type="text"
            placeholder=" Enter your 10 digit mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={showOtpBox}
          />
          {showOtpBox && (
            <>
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
            </>
          )}
        </div>

        {/* OTP Box */}
        {showOtpBox && (
          <>
            <label htmlFor="otp">OTP</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {error && <p className="error-text">{error}</p>}

            <button onClick={handleVerifyOtp} className="btn">
              Verify
            </button>
          </>
        )}

        {!showOtpBox && (
          <button onClick={handleSendOtp} className="btn">
            Send OTP
          </button>
        )}
      </div>
    </div>
  );
}
