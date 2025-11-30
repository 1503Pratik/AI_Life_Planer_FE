import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="header">
      <div className="header-left">
        <h2>{new Date().toLocaleDateString()}</h2>
        <h1>Welcome back, {user?.name || "Planner"}</h1>
      </div>
      <div className="header-right">
        <div className="tag">Productivity • Health • Finance</div>
        <div className="user-chip">
          <div className="small-label">{user?.email}</div>
          <button className="button secondary" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
