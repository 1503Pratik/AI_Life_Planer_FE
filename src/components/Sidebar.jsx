import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">MyAI Planner</div>
      <div className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-item">Dashboard</NavLink>
        <NavLink to="/tasks" className="sidebar-item">Tasks</NavLink>
        <NavLink to="/habits" className="sidebar-item">Habits</NavLink>
        <NavLink to="/goals" className="sidebar-item">Goals</NavLink>
        <NavLink to="/budget" className="sidebar-item">Budget</NavLink>
        <NavLink to="/ai" className="sidebar-item">AI Assistant</NavLink>
        <NavLink to="/calendar" className="sidebar-item">Calendar</NavLink>
      </div>
    </aside>
  );
}
