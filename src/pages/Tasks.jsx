import React, { useEffect, useState } from "react";
import { addTask, getTasks } from "../api/tasks";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", due_date: "" });

  useEffect(() => { load(); }, []);

  const load = async () => {
    setTasks(await getTasks());
  };

  const submit = async (e) => {
    e.preventDefault();
    await addTask({
      title: form.title,
      description: form.description,
      due_date: form.due_date ? `${form.due_date}T00:00:00` : null
    });
    setForm({ title: "", description: "", due_date: "" });
    load();
  };

  return (
    <div>
      <h3>Tasks</h3>
      <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 700 }}>
        <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})}/>
        <input className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})}/>
        <input className="input" type="date" value={form.due_date} onChange={e=>setForm({...form, due_date: e.target.value})}/>
        <button className="button">Add task</button>
      </form>

      <div style={{ marginTop: 12 }} className="list">
        {tasks.map(t => <div key={t._id} className="list-item">{t.title} • {t.status}</div>)}
      </div>
    </div>
  );
}
