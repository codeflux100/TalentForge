import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle login with Firebase
  const handleLogin = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      console.log("Logged in:", userCredential.user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      // Better error handling
      if (error.code === "auth/user-not-found") {
        alert("User not found");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format");
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="container">
      
      {/* LEFT SIDE */}
      <div className="left">
        <div className="left-content">
          <h1>TalentForge</h1>
          <h2>Your personal interview coach, available 24/7</h2>

          <p>
            Practice with AI that listens, watches, and scores — so you walk into every interview ready.
          </p>

          <div className="steps">
            <div>🎤 Speech Coaching</div>
            <div>😊 Emotion Analysis</div>
            <div className="active">🧠 Answer Quality</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <h2>Sign in</h2>
        <p>Start your interview prep journey</p>

        {/* Social Buttons (not connected yet) */}
        <div className="social">
          <button type="button">Google</button>
          <button type="button">GitHub</button>
        </div>

        <div className="divider">or</div>

        {/* Email */}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* Login Button */}
        <button className="btn" onClick={handleLogin}>
          Start Preparing →
        </button>

        {/* Footer */}
        <div className="footer">
          New here?{" "}
          <Link to="/signup" className="link">
            Create a free account
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Login;