import React from "react";
import { SEIZURE_FREQUENCIES } from "../data/clinicalData";

export default function Step9CurrentStatus({ data, onChange }) {
  const cs = data.currentStatus || {};
  const set = (field, val) => onChange({ ...data, currentStatus: { ...cs, [field]: val } });

  return (
    <div className="step-card">
      <h2>Current Status &amp; Goals</h2>
      <p className="step-description">
        Where you are right now with your epilepsy, and what matters most to you in your care.
      </p>

      <div className="form-row">
        <div className="form-group">
          <label>Current Seizure Frequency</label>
          <select value={cs.currentFrequency || ""} onChange={e => set("currentFrequency", e.target.value)}>
            <option value="">Select…</option>
            {SEIZURE_FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Date of Last Seizure</label>
          <input type="date" value={cs.lastSeizureDate || ""} onChange={e => set("lastSeizureDate", e.target.value)} />
        </div>
      </div>

      <div className="form-group">
        <label>Seizure Freedom Duration <span className="optional">(if applicable)</span></label>
        <input type="text" value={cs.seizureFreedomDuration || ""} onChange={e => set("seizureFreedomDuration", e.target.value)} placeholder="e.g. 2 years, 6 months" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Driving Eligibility</label>
          <select value={cs.drivingEligibility || ""} onChange={e => set("drivingEligibility", e.target.value)}>
            <option value="">Select…</option>
            <option>Cleared to drive</option>
            <option>Not cleared — seizure-free period not met</option>
            <option>Not cleared — other reason</option>
            <option>Not applicable (minor)</option>
            <option>Unknown</option>
          </select>
        </div>
        <div className="form-group">
          <label>Employment / School Status</label>
          <input type="text" value={cs.employmentStatus || ""} onChange={e => set("employmentStatus", e.target.value)} placeholder="e.g. Full-time student, employed, disability" />
        </div>
      </div>

      <div className="form-group">
        <label>Quality of Life Priorities <span className="optional">(what matters most to you)</span></label>
        <textarea value={cs.qualityOfLifePriorities || ""} onChange={e => set("qualityOfLifePriorities", e.target.value)} placeholder="e.g. Driving, reducing medication side effects, seizure freedom, pregnancy planning, improving memory…" />
      </div>
    </div>
  );
}
