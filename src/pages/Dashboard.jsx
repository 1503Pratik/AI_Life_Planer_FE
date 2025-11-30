import React, { useEffect, useState } from "react";
import { getTasks } from "../api/tasks";
import { getHabits } from "../api/habits";
import { getGoals } from "../api/goals";
import { getEvents } from "../api/calendar";
import { getSummary } from "../api/budget";
import { productivityPlan } from "../api/ai";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [goals, setGoals] = useState([]);
  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState(null);
  const [plan, setPlan] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setTasks(await getTasks());
        setHabits(await getHabits());
        setGoals(await getGoals());
        setEvents(await getEvents());
        setSummary(await getSummary());
        const p = await productivityPlan();
        setPlan(p.productivity_plan || JSON.stringify(p));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <section className="card">
          <div className="card-title">Tasks</div>
          <div className="list">{tasks.map(t=> <div key={t._id} className="list-item">{t.title}</div>)}</div>
        </section>
        <section className="card">
          <div className="card-title">Habits</div>
          <div className="list">{habits.map(h=> <div key={h._id} className="list-item">{h.habit_name}</div>)}</div>
        </section>
      </div>

      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <section className="card">
          <div className="card-title">Goals</div>
          <div className="list">{goals.map(g=> <div key={g._id} className="list-item">{g.goal_title} • {g.progress}%</div>)}</div>
        </section>

        <section className="card">
          <div className="card-title">Budget Summary</div>
          <div className="card-subtitle">{summary ? `Income: ${summary.income} Expenses: ${summary.expenses} Balance: ${summary.balance}` : "Loading..."}</div>
        </section>
      </div>

      <section className="card" style={{ marginTop: 12 }}>
        <div className="card-title">AI Daily Plan</div>
        <div className="card-subtitle" style={{ marginTop: 8 }}>{plan || "No plan yet"}</div>
      </section>
    </div>
  );
}
