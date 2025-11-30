import React, { useEffect, useState } from "react";
import { addHabit, getHabits, completeHabit, updateFitness } from "../api/habits";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({ habit_name: "", frequency: "daily" });

  useEffect(() => { load(); }, []);

  const load = async () => setHabits(await getHabits());

  const submit = async (e) => {
    e.preventDefault();
    await addHabit(form);
    setForm({ habit_name: "", frequency: "daily" });
    load();
  };

  const markDone = async (id) => {
    await completeHabit(id);
    load();
  };

  const updateFit = async (id) => {
    const steps = Number(prompt("Steps", "0"));
    const calories = Number(prompt("Calories", "0"));
    await updateFitness(id, { steps, calories });
    load();
  };

  return (
    <div>
      <h3>Habits</h3>
      <form onSubmit={submit} style={{ display: "flex", gap: 8, maxWidth: 700 }}>
        <input className="input" placeholder="Habit name" value={form.habit_name} onChange={e=>setForm({...form, habit_name: e.target.value})}/>
        <select className="select" value={form.frequency} onChange={e=>setForm({...form, frequency: e.target.value})}><option value="daily">Daily</option><option value="weekly">Weekly</option></select>
        <button className="button">Add</button>
      </form>

      <div style={{ marginTop: 12 }} className="list">
        {habits.map(h => (
          <div key={h._id} className="list-item">
            <div>
              <div>{h.habit_name}</div>
              <div className="small-label">Streak: {h.streak || 0}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="button secondary" onClick={()=>markDone(h._id)}>Done</button>
              <button className="button secondary" onClick={()=>updateFit(h._id)}>Update Fit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
