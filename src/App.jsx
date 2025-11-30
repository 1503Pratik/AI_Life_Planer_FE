// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App




// import React, { useEffect, useState } from "react";

// const API_BASE = "http://localhost:5000";

// function App() {
//   const [userId, setUserId] = useState("");
//   const [registeredUserId, setRegisteredUserId] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [tasks, setTasks] = useState([]);
//   const [habits, setHabits] = useState([]);
//   const [goals, setGoals] = useState([]);

//   const [newTask, setNewTask] = useState({ title: "", description: "", due_date: "" });
//   const [newHabit, setNewHabit] = useState({ habit_name: "", frequency: "daily" });
//   const [newGoal, setNewGoal] = useState({ goal_title: "", deadline: "" });

//   const [productivityPlan, setProductivityPlan] = useState("");
//   const [aiQuery, setAiQuery] = useState("");
//   const [aiResponse, setAiResponse] = useState("");

//   // ---------------- HELPERS ----------------
//   const activeUserId = registeredUserId || userId;

//   const fetchJson = async (url, options = {}) => {
//     const res = await fetch(url, {
//       headers: { "Content-Type": "application/json" },
//       ...options,
//     });
//     if (!res.ok) {
//       const text = await res.text();
//       throw new Error(text || res.statusText);
//     }
//     return res.json();
//   };

//   const loadAllData = async () => {
//     if (!activeUserId) {
//       alert("Please enter or register a user first.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const [tasksRes, habitsRes, goalsRes] = await Promise.all([
//         fetchJson(`${API_BASE}/tasks/all/${activeUserId}`),
//         fetchJson(`${API_BASE}/habits/all/${activeUserId}`),
//         fetchJson(`${API_BASE}/goals/all/${activeUserId}`),
//       ]);
//       setTasks(tasksRes);
//       setHabits(habitsRes);
//       setGoals(goalsRes);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load data. Check backend logs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadProductivityPlan = async () => {
//     if (!activeUserId) {
//       alert("Set a user first.");
//       return;
//     }
//     try {
//       const res = await fetchJson(`${API_BASE}/ai/productivity/${activeUserId}`);
//       setProductivityPlan(res.daily_plan || res.productivity_plan || JSON.stringify(res));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to get productivity plan.");
//     }
//   };

//   const handleRegisterDemoUser = async () => {
//     try {
//       const res = await fetchJson(`${API_BASE}/user/register`, {
//         method: "POST",
//         body: JSON.stringify({
//           name: "Demo User",
//           email: `demo_${Date.now()}@example.com`,
//         }),
//       });
//       setRegisteredUserId(res.id);
//       setUserId(res.id);
//       alert(`Demo user created with id: ${res.id}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to register user.");
//     }
//   };

//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     if (!activeUserId) return alert("Set a user first.");
//     if (!newTask.title) return;

//     try {
//       await fetchJson(`${API_BASE}/tasks/add`, {
//         method: "POST",
//         body: JSON.stringify({
//           user_id: activeUserId,
//           title: newTask.title,
//           description: newTask.description,
//           due_date: newTask.due_date ? `${newTask.due_date}T00:00:00` : null,
//         }),
//       });
//       setNewTask({ title: "", description: "", due_date: "" });
//       await loadAllData();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add task.");
//     }
//   };

//   const handleAddHabit = async (e) => {
//     e.preventDefault();
//     if (!activeUserId) return alert("Set a user first.");
//     if (!newHabit.habit_name) return;

//     try {
//       await fetchJson(`${API_BASE}/habits/add`, {
//         method: "POST",
//         body: JSON.stringify({
//           user_id: activeUserId,
//           habit_name: newHabit.habit_name,
//           frequency: newHabit.frequency || "daily",
//         }),
//       });
//       setNewHabit({ habit_name: "", frequency: "daily" });
//       await loadAllData();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add habit.");
//     }
//   };

//   const handleAddGoal = async (e) => {
//     e.preventDefault();
//     if (!activeUserId) return alert("Set a user first.");
//     if (!newGoal.goal_title) return;

//     try {
//       await fetchJson(`${API_BASE}/goals/add`, {
//         method: "POST",
//         body: JSON.stringify({
//           user_id: activeUserId,
//           goal_title: newGoal.goal_title,
//           deadline: newGoal.deadline || null,
//         }),
//       });
//       setNewGoal({ goal_title: "", deadline: "" });
//       await loadAllData();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add goal.");
//     }
//   };

//   const handleAIAsk = async () => {
//     if (!aiQuery.trim()) return;
//     try {
//       const res = await fetchJson(`${API_BASE}/ai/process`, {
//         method: "POST",
//         body: JSON.stringify({ query: aiQuery }),
//       });
//       setAiResponse(res.ai_output || JSON.stringify(res));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to process AI query.");
//     }
//   };

//   const totalSteps = habits.reduce((sum, h) => sum + (h.steps || 0), 0);
//   const totalCalories = habits.reduce((sum, h) => sum + (h.calories || 0), 0);

//   const today = new Date();
//   const dateString = today.toLocaleDateString(undefined, {
//     weekday: "long",
//     month: "short",
//     day: "numeric",
//   });

//   return (
//     <div className="app-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="sidebar-logo">MyAI Planner</div>

//         <div className="sidebar-nav">
//           <div className="sidebar-item active">
//             <span>Dashboard</span>
//             <span>●</span>
//           </div>
//           <div className="sidebar-item">
//             <span>Tasks</span>
//           </div>
//           <div className="sidebar-item">
//             <span>Habits</span>
//           </div>
//           <div className="sidebar-item">
//             <span>Goals</span>
//           </div>
//           <div className="sidebar-item">
//             <span>Analytics</span>
//           </div>
//           <div className="sidebar-item badge">
//             <span>AI Assistant</span>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="main">
//         {/* Header */}
//         <div className="header">
//           <div className="header-left">
//             <h2>{dateString}</h2>
//             <h1>Welcome back, {activeUserId ? "Planner" : "set a user 🔑"}</h1>
//           </div>
//           <div className="header-right">
//             <div className="tag">Productivity • Health • Finance</div>
//             <div className="user-chip">
//               <span className="small-label">User ID</span>
//               <input
//                 className="input"
//                 style={{ width: "220px" }}
//                 placeholder="Paste / use demo user ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//               />
//               <button className="button secondary" onClick={handleRegisterDemoUser}>
//                 Demo User
//               </button>
//               <button className="button secondary" onClick={loadAllData}>
//                 Load Data
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Top Grid: Left big (Tasks), Right small (Calendar/Budget style based on tasks/goals) */}
//         <div className="grid grid-2">
//           {/* LEFT: TASKS & QUICK ADD */}
//           <section className="card">
//             <div className="card-header">
//               <div>
//                 <div className="card-title">Today's Tasks</div>
//                 <div className="card-subtitle">
//                   Manage your schedule, add new tasks, and stay on track.
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleAddTask} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr auto", gap: "0.5rem", marginBottom: "0.75rem" }}>
//               <input
//                 className="input"
//                 placeholder="Task title"
//                 value={newTask.title}
//                 onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//               />
//               <input
//                 className="input"
//                 placeholder="Description"
//                 value={newTask.description}
//                 onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//               />
//               <input
//                 className="input"
//                 type="date"
//                 value={newTask.due_date}
//                 onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
//               />
//               <button className="button" type="submit">
//                 Add
//               </button>
//             </form>

//             <div className="list">
//               {tasks.length === 0 && <div className="card-subtitle">No tasks yet. Add one above.</div>}
//               {tasks.map((t) => (
//                 <div key={t._id} className="list-item">
//                   <div>
//                     <div>{t.title}</div>
//                     <div className="card-subtitle">
//                       {t.description || "No description"}
//                     </div>
//                   </div>
//                   <div style={{ textAlign: "right" }}>
//                     <div className="small-label">
//                       {t.due_date ? new Date(t.due_date).toLocaleDateString() : "No due date"}
//                     </div>
//                     <div className="small-label">
//                       Status: {t.status || "pending"}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* RIGHT: CALENDAR + GOALS SUMMARY STYLE */}
//           <section className="card">
//             <div className="card-header">
//               <div>
//                 <div className="card-title">Calendar & Goals</div>
//                 <div className="card-subtitle">Quick overview of upcoming work.</div>
//               </div>
//             </div>

//             <div className="small-label" style={{ marginBottom: "0.25rem" }}>
//               Upcoming Tasks
//             </div>
//             <div className="list">
//               {tasks
//                 .filter((t) => t.due_date)
//                 .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
//                 .slice(0, 4)
//                 .map((t) => (
//                   <div key={t._id} className="list-item">
//                     <span>{t.title}</span>
//                     <span className="small-label">
//                       {new Date(t.due_date).toLocaleDateString()}
//                     </span>
//                   </div>
//                 ))}
//               {tasks.filter((t) => t.due_date).length === 0 && (
//                 <div className="card-subtitle">No dated tasks. Add due dates to see them here.</div>
//               )}
//             </div>

//             <div style={{ marginTop: "0.75rem" }}>
//               <div className="small-label">Active Goals</div>
//               <div className="list">
//                 {goals.slice(0, 3).map((g) => (
//                   <div key={g._id} className="list-item">
//                     <span>{g.goal_title}</span>
//                     <span className="small-label">
//                       Progress: {g.progress ?? 0}%
//                     </span>
//                   </div>
//                 ))}
//                 {goals.length === 0 && (
//                   <div className="card-subtitle">No goals yet. Add one below.</div>
//                 )}
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Bottom Grid: Fitness & Productivity */}
//         <div className="grid grid-2-bottom">
//           {/* LEFT: HABITS + FITNESS */}
//           <section className="card">
//             <div className="card-header">
//               <div>
//                 <div className="card-title">Habits & Fitness</div>
//                 <div className="card-subtitle">
//                   Track habits and basic activity info (steps & calories).
//                 </div>
//               </div>
//             </div>

//             <form
//               onSubmit={handleAddHabit}
//               style={{ display: "grid", gridTemplateColumns: "2fr 1.3fr auto", gap: "0.5rem", marginBottom: "0.75rem" }}
//             >
//               <input
//                 className="input"
//                 placeholder="Habit name (e.g., Drink water)"
//                 value={newHabit.habit_name}
//                 onChange={(e) => setNewHabit({ ...newHabit, habit_name: e.target.value })}
//               />
//               <select
//                 className="select"
//                 value={newHabit.frequency}
//                 onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
//               >
//                 <option value="daily">Daily</option>
//                 <option value="weekly">Weekly</option>
//               </select>
//               <button className="button" type="submit">
//                 Add
//               </button>
//             </form>

//             <div className="list">
//               {habits.length === 0 && (
//                 <div className="card-subtitle">No habits yet. Add one above.</div>
//               )}
//               {habits.map((h) => (
//                 <div key={h._id} className="list-item">
//                   <div>
//                     <div>{h.habit_name}</div>
//                     <div className="small-label">
//                       {h.frequency || "daily"} • Streak: {h.streak ?? 0}
//                     </div>
//                   </div>
//                   <div style={{ textAlign: "right" }}>
//                     <div className="small-label">Steps: {h.steps ?? 0}</div>
//                     <div className="small-label">Cal: {h.calories ?? 0}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "space-between" }}>
//               <div className="small-label">Total steps (all habits): {totalSteps}</div>
//               <div className="small-label">Total calories: {totalCalories}</div>
//             </div>
//           </section>

//           {/* RIGHT: AI PRODUCTIVITY + CHAT */}
//           <section className="card">
//             <div className="card-header">
//               <div>
//                 <div className="card-title">AI Productivity & Assistant</div>
//                 <div className="card-subtitle">
//                   Ask AI for a day plan or any productivity advice.
//                 </div>
//               </div>
//               <button className="button" onClick={loadProductivityPlan}>
//                 Generate Plan
//               </button>
//             </div>

//             <div style={{ marginBottom: "0.75rem" }}>
//               <div className="small-label">AI Daily Plan</div>
//               <div className="card-subtitle" style={{ marginTop: "0.25rem" }}>
//                 {productivityPlan || "Click 'Generate Plan' to get a suggestion based on your tasks."}
//               </div>
//             </div>

//             <div style={{ marginTop: "0.75rem" }}>
//               <div className="small-label">Chat with AI</div>
//               <textarea
//                 placeholder="Ask anything: 'Prioritize my tasks', 'Suggest a routine', 'Help me focus'..."
//                 value={aiQuery}
//                 onChange={(e) => setAiQuery(e.target.value)}
//               />
//               <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <button className="button" type="button" onClick={handleAIAsk}>
//                   Ask AI
//                 </button>
//                 {loading && <span className="small-label">Loading...</span>}
//               </div>
//               {aiResponse && (
//                 <div style={{ marginTop: "0.6rem" }}>
//                   <div className="small-label">AI Response</div>
//                   <div className="card-subtitle" style={{ marginTop: "0.2rem", whiteSpace: "pre-wrap" }}>
//                     {aiResponse}
//                   </div>
//                 </div>
//               )}
//               {/* {aiResponse && (
//                 <div style={{ marginTop: "0.6rem" }}>
//                   <div className="small-label">AI Response</div>
//                   <div className="ai-response-box">
//                     <pre>{aiResponse}</pre>
//                   </div>
//                 </div>
//               )} */}
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;





import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Habits from "./pages/Habits";
import Goals from "./pages/Goals";
import Budget from "./pages/Budget";
import AIChat from "./pages/AIChat";
import CalendarPage from "./pages/Calendar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      {user && <Sidebar />}
      <main className="main">
        {user && <Header />}
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/ai" element={<AIChat />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </main>
    </div>
  );
}
