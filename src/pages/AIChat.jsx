import React, { useEffect, useState } from "react";
import { askAI, recommendTasks, productivityPlan } from "../api/ai";

export default function AIChat() {
  const [q, setQ] = useState("");
  const [resp, setResp] = useState("");
  const [plan, setPlan] = useState("");
  const [recs, setRecs] = useState(null);

  useEffect(()=>{ (async ()=>{ try{ const r = await productivityPlan(); setPlan(r.productivity_plan || JSON.stringify(r)); }catch(e){}})(); }, []);

  const ask = async () => {
    const r = await askAI(q);
    setResp(r.ai_output || JSON.stringify(r));
  };

  const getRecs = async () => {
    const r = await recommendTasks();
    setRecs(r);
  };

  return (
    <div>
      <h3>AI Assistant</h3>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-title">Daily Plan</div>
        <div className="card-subtitle">{plan}</div>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask AI..." />
          <button className="button" onClick={ask}>Ask</button>
          <button className="button secondary" onClick={getRecs}>Get Task Recs</button>
        </div>
        {resp && <div style={{ marginTop: 8 }} className="card-subtitle">{resp}</div>}
        {recs && <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{JSON.stringify(recs, null, 2)}</pre>}
      </div>
    </div>
  );
}
