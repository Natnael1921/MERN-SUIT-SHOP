import React, { useState } from "react";
import axios from "axios";
import { PageNav } from "../components/PageNav";
import { useNavigate } from "react-router-dom";
export function AuthPage({setIsLoggedIn,isLoggedIn}) {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate=useNavigate();

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
          form
        );
        alert("Registered successfully! Please login.");
        setIsRegistered(true);
        navigate("/cloths")
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        setIsLoggedIn(true);
        navigate("/cloths")
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert("Error occurred. Try again.");
    }
  }
  return (
    <div className="auth-page">
      <PageNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <form onSubmit={handleSubmit} className="auth-form">
        <h3>{isRegistered ? "Sign In" : "Register"}</h3>

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
