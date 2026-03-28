import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle signup with Firebase
  const handleSignup = async () => {
    // Validate fields
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    // Password match check
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Password length check
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      console.log("User created:", userCredential.user);

      // Redirect after signup
      navigate("/dashboard");
    } catch (error) {
      // Better error handling
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format");
      } else if (error.code === "auth/weak-password") {
        alert("Weak password");
      } else {
        alert("Signup failed");
      }
    }
  };

  return (
    <div className="container">
      
      {/* LEFT SIDE */}
      <div className="left">
        <div className="left-content">
          <h1>Start your journey to crack interviews</h1>
          <p>
            Practice smarter with AI-powered feedback and real-time analysis.
          </p>

          <div className="steps">
            <div className="active">🚀 Get Started</div>
            <div>🎯 Track Progress</div>
            <div>🏆 Improve Daily</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <h2>Create Account</h2>
        <p>Join TalentForge today</p>

        {/* Social Buttons */}
        <div className="social">
          <button type="button">Google</button>
          <button type="button">GitHub</button>
        </div>

        <div className="divider">or</div>

        {/* Name */}
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />
        </div>

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

        {/* Confirm Password */}
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {/* Button */}
        <button className="btn" onClick={handleSignup}>
          Create Account →
        </button>

        {/* Footer */}
        <div className="footer">
          Already have an account?{" "}
          <Link to="/" className="link">
            Sign in
          </Link>
        </div>
      </div>

    </div>
  );
};

export default SignUp;