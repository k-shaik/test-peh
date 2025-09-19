"use client";

import Link from "next/link";
import "../forgot.css";

export default function SuccessPage() {
  return (
    <div
      className="auth-container"
      style={{ backgroundImage: "url('/media/bg.jpg')" }}
    >


      <div className="auth-box success-box">
        <h2>Forgot password</h2>
        <p className="sub-text">Let’s reset your password.</p>

       <img src="/media/Good.jpg" alt="Success" className="success-img" />

<p className="message">Your password has been successfully changed</p>

<p className="message">
  Login from{" "}
  <Link href="/" className="login-link">here</Link>{" "}
  to start the onboarding
</p>

      </div>
    </div>
  );
}
