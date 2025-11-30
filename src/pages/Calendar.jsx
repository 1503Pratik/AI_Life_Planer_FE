import React, { useEffect, useState } from "react";
import { addEvent, getEvents } from "../api/calendar";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", time: "" });

  useEffect(()=>{ load(); }, []);
  const load = async () => setEvents(await getEvents());

  const submit = async (e) => {
    e.preventDefault();
    await addEvent(form);
    setForm({ title: "", date: "", time: "" });
    load();
  };

  return (
    <div>
      <h3>Calendar</h3>
      <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 700 }}>
        <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
        <input className="input" type="date" value={form.date} onChange={e=>setForm({...form, date: e.target.value})} />
        <input className="input" type="time" value={form.time} onChange={e=>setForm({...form, time: e.target.value})} />
        <button className="button">Add event</button>
      </form>

      <div style={{ marginTop: 12 }} className="list">
        {events.map(ev => <div key={ev._id} className="list-item">{ev.title} • {ev.date} {ev.time || ""}</div>)}
      </div>
    </div>
  );
}
