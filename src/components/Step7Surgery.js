import React from "react";
import { SURGERY_TYPES, NEUROMODULATION_DEVICES } from "../data/clinicalData";

export default function Step7Surgery({ data, onChange }) {
  const surg = data.surgery || { hasSurgery: false, surgeries: [], neuromodulation: "None", neuromodulationDetails: "", presurgicalStatus: "" };
  const set = (field, val) => onChange({ ...data, surgery: { ...surg, [field]: val } });

  function addSurgery() {
    set("surgeries", [...(surg.surgeries || []), { type: "", date: "", outcome: "" }]);
  }
  function updateSurgery(index, field, val) {
    const updated = surg.surgeries.map((s, i) => i === index ? { ...s, [field]: val } : s);
    set("surgeries", updated);
  }
  function removeSurgery(index) {
    set("surgeries", surg.surgeries.filter((_, i) => i !== index));
  }

  return (
    <div className="step-card">
      <h2>Surgical History &amp; Neuromodulation</h2>
      <p className="step-description">
        Any epilepsy surgery or neuromodulation devices. Skip this section if not applicable.
      </p>

      <div className="form-group">
        <label>Have you had epilepsy surgery?</label>
        <select value={surg.hasSurgery ? "yes" : "no"} onChange={e => set("hasSurgery", e.target.value === "yes")}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      {surg.hasSurgery && (
        <>
          {(surg.surgeries || []).map((s, i) => (
            <div className="repeater-block" key={i}>
              <div className="repeater-header">
                <h4>Surgery {i + 1}</h4>
                <button className="btn-remove" onClick={() => removeSurgery(i)}>✕</button>
              </div>
              <div className="form-group">
                <label>Type of Surgery</label>
                <select value={s.type || ""} onChange={e => updateSurgery(i, "type", e.target.value)}>
                  <option value="">Select…</option>
                  {SURGERY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={s.date || ""} onChange={e => updateSurgery(i, "date", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Outcome</label>
                  <select value={s.outcome || ""} onChange={e => updateSurgery(i, "outcome", e.target.value)}>
                    <option value="">Select…</option>
                    <option>Engel Class I — seizure free</option>
                    <option>Engel Class II — rare seizures</option>
                    <option>Engel Class III — worthwhile improvement</option>
                    <option>Engel Class IV — no improvement</option>
                    <option>Too early to assess</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          <button className="btn-add" onClick={addSurgery}>+ Add Surgery</button>
        </>
      )}

      <div className="form-group mt-2">
        <label>Neuromodulation Device</label>
        <select value={surg.neuromodulation || "None"} onChange={e => set("neuromodulation", e.target.value)}>
          {NEUROMODULATION_DEVICES.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {surg.neuromodulation !== "None" && (
        <div className="form-group">
          <label>Device Details <span className="optional">(model, settings, implant date)</span></label>
          <textarea value={surg.neuromodulationDetails || ""} onChange={e => set("neuromodulationDetails", e.target.value)} placeholder="e.g. VNS model, current settings, implant date…" />
        </div>
      )}

      <div className="form-group mt-2">
        <label>Presurgical Evaluation Status <span className="optional">(optional)</span></label>
        <select value={surg.presurgicalStatus || ""} onChange={e => set("presurgicalStatus", e.target.value)}>
          <option value="">Select…</option>
          <option>Not a surgical candidate</option>
          <option>Not yet evaluated</option>
          <option>Under evaluation</option>
          <option>Completed — offered surgery</option>
          <option>Completed — not a candidate</option>
          <option>Surgery completed (see above)</option>
        </select>
      </div>
    </div>
  );
}
