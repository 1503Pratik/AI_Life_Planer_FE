import React, { useEffect, useState } from "react";
import { addGoal, getGoals, updateGoal, progressGoal } from "../api/goals";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ goal_title: "", deadline: "" });

  useEffect(() => { load(); }, []);
  const load = async () => setGoals(await getGoals());

  const submit = async (e) => {
    e.preventDefault();
    await addGoal(form);
    setForm({ goal_title: "", deadline: "" });
    load();
  };

  const incProgress = async (id) => {
    const delta = Number(prompt("Increase progress by %", "10"));
    await progressGoal(id, { delta });
    load();
  };

  const edit = async (id) => {
    const title = prompt("New title");
    if (title) {
      await updateGoal(id, { goal_title: title });
      load();
    }
  };

  return (
    <div>
      <h3>Goals</h3>
      <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 700 }}>
        <input className="input" placeholder="Goal title" value={form.goal_title} onChange={e=>setForm({...form, goal_title: e.target.value})}/>
        <input className="input" type="date" value={form.deadline} onChange={e=>setForm({...form, deadline: e.target.value})}/>
        <button className="button">Add goal</button>
      </form>

      <div style={{ marginTop: 12 }} className="list">
        {goals.map(g => (
          <div key={g._id} className="list-item">
            <div>{g.goal_title} • {g.progress}%</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="button secondary" onClick={()=>incProgress(g._id)}>+Progress</button>
              <button className="button secondary" onClick={()=>edit(g._id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
