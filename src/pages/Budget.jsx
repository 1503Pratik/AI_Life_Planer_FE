import React, { useEffect, useState } from "react";
import { addTransaction, getSummary } from "../api/budget";

export default function Budget() {
  const [form, setForm] = useState({ amount: "", type: "expense", category: "" });
  const [summary, setSummary] = useState(null);

  useEffect(()=>{ load(); }, []);
  const load = async () => setSummary(await getSummary());

  const submit = async (e) => {
    e.preventDefault();
    await addTransaction({ amount: Number(form.amount), type: form.type, category: form.category });
    setForm({ amount: "", type: "expense", category: "" });
    load();
  };

  return (
    <div>
      <h3>Budget</h3>
      <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 700 }}>
        <input className="input" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} />
        <select className="select" value={form.type} onChange={e=>setForm({...form, type: e.target.value})}><option value="expense">Expense</option><option value="income">Income</option></select>
        <input className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category: e.target.value})}/>
        <button className="button">Add</button>
      </form>

      <div style={{ marginTop: 12 }} className="card">
        <div className="card-title">Summary</div>
        <div className="card-subtitle">{summary ? `Income ${summary.income} • Expenses ${summary.expenses} • Balance ${summary.balance}` : "Loading..."}</div>
      </div>
    </div>
  );
}
