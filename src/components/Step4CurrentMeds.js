import React from "react";
import ASMAutocomplete from "./ASMAutocomplete";

export default function Step4CurrentMeds({ data, onChange }) {
  const list = data.currentMedications || [];

  function updateItem(index, field, val) {
    const updated = list.map((item, i) => i === index ? { ...item, [field]: val } : item);
    onChange({ ...data, currentMedications: updated });
  }

  function addItem() {
    onChange({ ...data, currentMedications: [...list, { name: "", dose: "", frequency: "", level: "", startDate: "", effectiveness: "" }] });
  }

  function removeItem(index) {
    onChange({ ...data, currentMedications: list.filter((_, i) => i !== index) });
  }

  // Valproate warning
  const hasValproate = list.some(m => /valpro|depakote|depakene|epilim/i.test(m.name || ""));
  const isFemale = /female|f/i.test(data.demographics?.sex || "");

  return (
    <div className="step-card">
      <h2>Current Medications</h2>
      <p className="step-description">
        All anti-seizure medications (ASMs) you are currently taking. Start typing the medication name to see suggestions.
      </p>

      {hasValproate && isFemale && (
        <div className="warning-box">
          ⚠ Valproate detected for a female patient. Ensure pregnancy prevention program and folic acid supplementation are documented in the Special Considerations section.
        </div>
      )}

      {list.map((med, i) => (
        <div className="repeater-block" key={i}>
          <div className="repeater-header">
            <h4>Medication {i + 1}</h4>
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
              <label>Current Dose</label>
              <input type="text" value={med.dose || ""} onChange={e => updateItem(i, "dose", e.target.value)} placeholder="e.g. 500 mg twice daily" />
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label>Frequency</label>
              <select value={med.frequency || ""} onChange={e => updateItem(i, "frequency", e.target.value)}>
                <option value="">Select…</option>
                <option>Once daily</option>
                <option>Twice daily</option>
                <option>Three times daily</option>
                <option>As needed (PRN)</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Blood Level <span className="optional">(if monitored)</span></label>
              <input type="text" value={med.level || ""} onChange={e => updateItem(i, "level", e.target.value)} placeholder="e.g. 48 mcg/mL" />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" value={med.startDate || ""} onChange={e => updateItem(i, "startDate", e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Effectiveness</label>
            <select value={med.effectiveness || ""} onChange={e => updateItem(i, "effectiveness", e.target.value)}>
              <option value="">Select…</option>
              <option>Excellent — seizure free</option>
              <option>Good — significant reduction</option>
              <option>Moderate — some reduction</option>
              <option>Minimal — little benefit</option>
              <option>Too early to assess</option>
              <option>Unknown</option>
            </select>
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={addItem}>+ Add Current Medication</button>
    </div>
  );
}
