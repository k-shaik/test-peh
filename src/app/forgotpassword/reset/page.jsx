"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import "../forgot.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const constraints = [
    { regex: /.{8,}/, message: "Min 8 characters" },
    { regex: /[A-Z]/, message: "At least one uppercase letter" },
    { regex: /[a-z]/, message: "At least one lowercase letter" },
    { regex: /\d/, message: "At least one digit" },
    { regex: /[@$!%*?&]/, message: "At least one special character (@$!%*?&)" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = constraints.every((rule) => rule.regex.test(password));
    if (!isValid) return;

    router.push("/forgotpassword/create");
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: "url('/media/bg.jpg')" }}
    >
      <div className="auth-box">
        <h2>Forgot Password</h2>
        <p>Let’s reset your password</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Create Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
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

          <ul className="constraints">
            {constraints.map((rule, idx) => (
              <li
                key={idx}
                className={rule.regex.test(password) ? "valid" : "invalid"}
              >
                {rule.message}
              </li>
            ))}
          </ul>

          <button
            type="submit"
            className="btn"
            disabled={!constraints.every((rule) => rule.regex.test(password))}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
