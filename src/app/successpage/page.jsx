"use client";

import Link from "next/link";
import "./Success.css"; 

export default function SuccessPage() {
  return (
    <div
      className="auth-container"
      style={{ backgroundImage: "url('/media/bg.jpg')" }}
    >
      <div className="auth-box">
        <h2>Welcome to Pehnawa</h2>
        <img
          src="/media/Good.Jpg"
          alt="Success"
          className="success-img"
        />
        <p>Your account has been successfully created</p>
        <p>
          Login from{" "}
          <Link href="/" className="login-link">
            here
          </Link>{" "}
          to start the onboarding
        </p>
      </div>
    </div>
  );
}
