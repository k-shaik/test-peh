"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; 
import "./User.css"; 

export default function UserDetails({ onSuccess }) {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const constraints = [
    { regex: /.{8,}/, message: "Min 8 characters" },
    { regex: /[A-Z]/, message: "At least one uppercase letter" },
    { regex: /\d/, message: "At least one digit" },
    { regex: /[!@#$%^&*]/, message: "At least one special character (!@#$%^&*)" },
  ];

  const handleSubmit = () => {
    const isValid = constraints.every(rule => rule.regex.test(password));
    if (!isValid) return; 

    if (onSuccess) {
      onSuccess();
    }
    router.push("/successpage");
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: "url('/media/bg.jpg')" }}
    >
      <div className="auth-box">
        <h2>Welcome to Pehnawa</h2>
        <p>Let’s create your Partner Account to begin.</p>

        
        <label htmlFor="fullname">Full name</label>
        <input
          id="fullname"
          type="text"
          placeholder="I’m Admin"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        
        <label htmlFor="password">Create password</label>
        <div className="password-wrapper">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <button onClick={handleSubmit} className="btn">
          Continue
        </button>
      </div>
    </div>
  );
}
