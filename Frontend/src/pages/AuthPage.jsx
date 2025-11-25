import React, { useState } from "react";
import axios from "axios";
import { PageNav } from "../components/PageNav";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
export function AuthPage({ setIsLoggedIn, isLoggedIn, role, setRole }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!isRegistered) {
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          { ...form, role }
        );
        alert("Registered successfully! Please login.");
        setIsRegistered(true);
        navigate("/cloths");
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: form.email,
          password: form.password,
          role,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("userId", res.data.user.id);
        console.log("Stored userId:", res.data.user.id);

        alert("Login successful!");
        setIsLoggedIn(true);
        setRole(res.data.user.role);
        if (res.data.user.role === "user") {
          navigate("/cloths");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert("Error occurred. Try again.");
    }
  }
  return (
    <div className="auth-page">
      <PageNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <form onSubmit={handleSubmit} className="auth-form">
        <h3>{isRegistered ? "Sign In" : "Register"}</h3>
        <div className="role-toggle">
          <button
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
            type="button"
          >
            User
          </button>
          <button
            className={role === "owner" ? "active" : ""}
            onClick={() => setRole("admin")}
            type="button"
          >
            admin
          </button>
        </div>
        {!isRegistered && (
          <input
            type="text"
            name="username"
            placeholder="Name"
            onChange={handleChange}
          />
        )}
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          className={!isRegistered ? "auth-button" : "auth-button"}
          type="submit"
        >
          {isRegistered ? "Login" : "Register"}
        </button>

        <p className="auth-toggle">
          {isRegistered ? "Don't have an account?" : "Already have an account?"}
          <span
            className="toggle-link"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            {isRegistered ? " Register" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
}
