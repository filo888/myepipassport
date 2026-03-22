import React from "react";

export default function Step1Demographics({ data, onChange }) {
  const d = data.demographics || {};
  const set = (field, val) => onChange({ ...data, demographics: { ...d, [field]: val } });

  return (
    <div className="step-card">
      <h2>Demographics &amp; Emergency Contacts</h2>
      <p className="step-description">
        Basic identifying information and who to contact in an emergency. This section appears at the top of your passport.
      </p>

      <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" value={d.firstName || ""} onChange={e => set("firstName", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={d.lastName || ""} onChange={e => set("lastName", e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" value={d.dateOfBirth || ""} onChange={e => set("dateOfBirth", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Sex</label>
          <select value={d.sex || ""} onChange={e => set("sex", e.target.value)}>
            <option value="">Select…</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Primary Neurologist</label>
          <input type="text" value={d.primaryNeurologist || ""} onChange={e => set("primaryNeurologist", e.target.value)} placeholder="Dr. Name" />
        </div>
        <div className="form-group">
          <label>Neurologist Phone</label>
          <input type="tel" value={d.neurologistPhone || ""} onChange={e => set("neurologistPhone", e.target.value)} />
        </div>
      </div>

      <div className="form-group">
        <label>Epilepsy Center <span className="optional">(optional)</span></label>
        <input type="text" value={d.epilepsyCenter || ""} onChange={e => set("epilepsyCenter", e.target.value)} />
      </div>

      <h3 style={{fontSize:"1rem",color:"var(--color-primary)",margin:"1.5rem 0 0.8rem",fontFamily:"var(--font-heading)"}}>Emergency Contact 1</h3>
      <div className="form-row-3">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={d.emergencyContact1Name || ""} onChange={e => set("emergencyContact1Name", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" value={d.emergencyContact1Phone || ""} onChange={e => set("emergencyContact1Phone", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Relationship</label>
          <input type="text" value={d.emergencyContact1Relation || ""} onChange={e => set("emergencyContact1Relation", e.target.value)} placeholder="e.g. Parent, Spouse" />
        </div>
      </div>

      <h3 style={{fontSize:"1rem",color:"var(--color-primary)",margin:"1rem 0 0.8rem",fontFamily:"var(--font-heading)"}}>Emergency Contact 2 <span className="optional">(optional)</span></h3>
      <div className="form-row-3">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={d.emergencyContact2Name || ""} onChange={e => set("emergencyContact2Name", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" value={d.emergencyContact2Phone || ""} onChange={e => set("emergencyContact2Phone", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Relationship</label>
          <input type="text" value={d.emergencyContact2Relation || ""} onChange={e => set("emergencyContact2Relation", e.target.value)} />
        </div>
      </div>
    </div>
  );
}
