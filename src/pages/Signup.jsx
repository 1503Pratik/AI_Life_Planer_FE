import React, { useState } from "react";
import { register } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { setToken } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(name, email, password);
      const token = res.token;
      setToken(token);
      nav("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Sign up</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="button">Create account</button>
      </form>
    </div>
  );
}
