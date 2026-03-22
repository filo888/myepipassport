import React from "react";
import ASMAutocomplete from "./ASMAutocomplete";
import { DISCONTINUATION_REASONS } from "../data/asmDatabase";

export default function Step5MedHistory({ data, onChange }) {
  const list = data.medicationHistory || [];

  function updateItem(index, field, val) {
    const updated = list.map((item, i) => i === index ? { ...item, [field]: val } : item);
    onChange({ ...data, medicationHistory: updated });
  }

  function addItem() {
    onChange({ ...data, medicationHistory: [...list, { name: "", peakDose: "", duration: "", reason: "", notes: "" }] });
  }

  function removeItem(index) {
    onChange({ ...data, medicationHistory: list.filter((_, i) => i !== index) });
  }

  return (
    <div className="step-card">
      <h2>Medication History</h2>
      <p className="step-description">
        This is often the most critical and most frequently lost information during care transitions.
        List every anti-seizure medication you have ever tried, even briefly, including why it was stopped.
      </p>

      <div className="info-box">
        <strong>Why this matters:</strong> Without this history, new doctors may restart medications that already failed, 
        or miss drugs that caused dangerous reactions. Take your time to be as thorough as possible.
      </div>

      {list.map((med, i) => (
        <div className="repeater-block" key={i}>
          <div className="repeater-header">
            <h4>Past Medication {i + 1}</h4>
            <button className="btn-remove" onClick={() => removeItem(i)}>✕ Remove</button>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Medication Name</label>
              <ASMAutocomplete
                value={med.name || ""}
                onChange={(val) => updateItem(i, "name", val)}
              />
            </div>
            <div className="form-group">
              <label>Peak Dose Reached</label>
              <input type="text" value={med.peakDose || ""} onChange={e => updateItem(i, "peakDose", e.target.value)} placeholder="e.g. 2000 mg/day" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duration of Trial</label>
              <input type="text" value={med.duration || ""} onChange={e => updateItem(i, "duration", e.target.value)} placeholder="e.g. 6 months, 2 years" />
            </div>
            <div className="form-group">
              <label>Reason for Discontinuation</label>
              <select value={med.reason || ""} onChange={e => updateItem(i, "reason", e.target.value)}>
                <option value="">Select reason…</option>
                {DISCONTINUATION_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Additional Notes <span className="optional">(optional — e.g., specific side effect details)</span></label>
            <textarea
              value={med.notes || ""}
              onChange={e => updateItem(i, "notes", e.target.value)}
              placeholder="Any other details about this medication trial…"
            />
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={addItem}>+ Add Past Medication</button>
    </div>
  );
}
