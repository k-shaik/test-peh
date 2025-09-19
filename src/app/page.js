"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link"; 
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert(`Email: ${email}, Password: ${password}`);
      router.push('/SellerOnboarding');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log in</h2>
        <p className="signup-text">
          New to Pehnawa?{" "}
          <Link href="/mobileverification">Sign up for free</Link>
        </p>

        <form onSubmit={handleSubmit}>
      
          <label>Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label>Password</label>
          <div className="password-row">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
    type="button"
    className="toggle-show"
    onClick={() => setShowPassword((prev) => !prev)}
  >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
           

          <Link href="/forgotpassword" className="forgot-link">
            Forgot password?
          </Link>

          
          <button type="submit" className="btn-login">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
