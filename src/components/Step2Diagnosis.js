import React from "react";
import { EPILEPSY_TYPES, EPILEPSY_SYNDROMES, ETIOLOGIES } from "../data/clinicalData";

export default function Step2Diagnosis({ data, onChange }) {
  const dx = data.diagnosis || {};
  const set = (field, val) => onChange({ ...data, diagnosis: { ...dx, [field]: val } });

  return (
    <div className="step-card">
      <h2>Epilepsy Diagnosis Summary</h2>
      <p className="step-description">
        Your epilepsy classification according to ILAE standards. If unsure about any field, select "Unknown" — your neurologist can help complete this later.
      </p>

      <div className="form-group">
        <label>Epilepsy Type</label>
        <select value={dx.epilepsyType || ""} onChange={e => set("epilepsyType", e.target.value)}>
          <option value="">Select…</option>
          {EPILEPSY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Epilepsy Syndrome <span className="optional">(if known)</span></label>
        <select value={dx.epilepsySyndrome || ""} onChange={e => set("epilepsySyndrome", e.target.value)}>
          <option value="">Select…</option>
          {EPILEPSY_SYNDROMES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Etiology</label>
        <select value={dx.etiology || ""} onChange={e => set("etiology", e.target.value)}>
          <option value="">Select…</option>
          {ETIOLOGIES.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Age of Onset</label>
          <input type="text" value={dx.ageOfOnset || ""} onChange={e => set("ageOfOnset", e.target.value)} placeholder="e.g. 3 years, 14 months" />
        </div>
        <div className="form-group">
          <label>Date of Diagnosis <span className="optional">(approximate is fine)</span></label>
          <input type="date" value={dx.dateOfDiagnosis || ""} onChange={e => set("dateOfDiagnosis", e.target.value)} />
        </div>
      </div>

      <div className="form-group">
        <label>Additional Notes <span className="optional">(optional)</span></label>
        <textarea
          value={dx.diagnosisNotes || ""}
          onChange={e => set("diagnosisNotes", e.target.value)}
          placeholder="Any other relevant context about the diagnosis…"
        />
      </div>
    </div>
  );
}
