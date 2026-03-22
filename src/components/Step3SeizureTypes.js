import React from "react";
import { SEIZURE_TYPES, SEIZURE_FREQUENCIES } from "../data/clinicalData";

const allSeizureSubtypes = Object.values(SEIZURE_TYPES).flatMap(group =>
  group.subtypes.map(s => ({ label: s, group: group.label }))
);

export default function Step3SeizureTypes({ data, onChange }) {
  const list = data.seizureTypes || [];

  function updateItem(index, field, val) {
    const updated = list.map((item, i) => i === index ? { ...item, [field]: val } : item);
    onChange({ ...data, seizureTypes: updated });
  }

  function addItem() {
    onChange({ ...data, seizureTypes: [...list, { classification: "", duration: "", frequency: "", aura: "", description: "" }] });
  }

  function removeItem(index) {
    onChange({ ...data, seizureTypes: list.filter((_, i) => i !== index) });
  }

  return (
    <div className="step-card">
      <h2>Seizure Types &amp; Semiology</h2>
      <p className="step-description">
        Describe each distinct seizure type you experience. Use the ILAE classification dropdown, then add details in your own words if helpful.
      </p>

      {list.map((sz, i) => (
        <div className="repeater-block" key={i}>
          <div className="repeater-header">
            <h4>Seizure Type {i + 1}</h4>
            <button className="btn-remove" onClick={() => removeItem(i)}>✕ Remove</button>
          </div>

          <div className="form-group">
            <label>ILAE Classification</label>
            <select value={sz.classification || ""} onChange={e => updateItem(i, "classification", e.target.value)}>
              <option value="">Select seizure type…</option>
              {Object.entries(SEIZURE_TYPES).map(([key, group]) => (
                <optgroup key={key} label={group.label}>
                  {group.subtypes.map(s => <option key={s} value={s}>{s}</option>)}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label>Typical Duration</label>
              <input type="text" value={sz.duration || ""} onChange={e => updateItem(i, "duration", e.target.value)} placeholder="e.g. 30 seconds, 1–2 minutes" />
            </div>
            <div className="form-group">
              <label>Frequency</label>
              <select value={sz.frequency || ""} onChange={e => updateItem(i, "frequency", e.target.value)}>
                <option value="">Select…</option>
                {SEIZURE_FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Warning Signs / Aura</label>
              <input type="text" value={sz.aura || ""} onChange={e => updateItem(i, "aura", e.target.value)} placeholder="e.g. déjà vu, rising feeling" />
            </div>
          </div>

          <div className="form-group">
            <label>Description in Your Own Words <span className="optional">(optional)</span></label>
            <textarea
              value={sz.description || ""}
              onChange={e => updateItem(i, "description", e.target.value)}
              placeholder="Describe what happens during this type of seizure…"
            />
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={addItem}>+ Add Seizure Type</button>

      {list.length === 0 && (
        <div className="info-box mt-2">
          Click "Add Seizure Type" above to describe each distinct seizure type you experience.
        </div>
      )}
    </div>
  );
}
