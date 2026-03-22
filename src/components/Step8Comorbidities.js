import React from "react";

export default function Step8Comorbidities({ data, onChange }) {
  const co = data.comorbidities || {};
  const set = (field, val) => onChange({ ...data, comorbidities: { ...co, [field]: val } });

  return (
    <div className="step-card">
      <h2>Comorbidities</h2>
      <p className="step-description">
        Other medical or psychological conditions that may affect your epilepsy treatment. Leave blank if not applicable.
      </p>

      <div className="form-group">
        <label>Psychiatric Diagnoses <span className="optional">(e.g., depression, anxiety, ADHD)</span></label>
        <textarea value={co.psychiatric || ""} onChange={e => set("psychiatric", e.target.value)} placeholder="List any psychiatric conditions…" />
      </div>

      <div className="form-group">
        <label>Cognitive / Developmental Status</label>
        <textarea value={co.cognitive || ""} onChange={e => set("cognitive", e.target.value)} placeholder="e.g. intellectual disability, learning disability, autism spectrum…" />
      </div>

      <div className="form-group">
        <label>Other Neurological Conditions</label>
        <textarea value={co.neurological || ""} onChange={e => set("neurological", e.target.value)} placeholder="e.g. migraine, cerebral palsy, neuropathy…" />
      </div>

      <div className="form-group">
        <label>Other Medical Conditions</label>
        <textarea value={co.otherMedical || ""} onChange={e => set("otherMedical", e.target.value)} placeholder="e.g. asthma, diabetes, cardiac conditions…" />
      </div>

      <div className="form-group">
        <label>Additional Notes <span className="optional">(optional)</span></label>
        <textarea value={co.notes || ""} onChange={e => set("notes", e.target.value)} placeholder="Any other relevant medical context…" />
      </div>
    </div>
  );
}
