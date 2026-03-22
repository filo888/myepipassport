import React from "react";
import { RESCUE_MEDICATIONS } from "../data/clinicalData";

export default function Step10Special({ data, onChange }) {
  const sp = data.specialConsiderations || {};
  const set = (field, val) => onChange({ ...data, specialConsiderations: { ...sp, [field]: val } });

  const isFemale = /female|f/i.test(data.demographics?.sex || "");
  const hasTeratogenic = (data.currentMedications || []).some(m =>
    /valpro|depakote|depakene|epilim|topiramate|topamax|phenytoin|dilantin|carbamazepine|tegretol|phenobarbital|primidone/i.test(m.name || "")
  );

  return (
    <div className="step-card">
      <h2>Special Considerations</h2>
      <p className="step-description">
        Safety planning, rescue medications, and life-stage considerations. These are important for emergency situations and long-term care planning.
      </p>

      {/* SUDEP */}
      <div className="form-group">
        <label>Has SUDEP Risk Been Discussed With You?</label>
        <select value={sp.sudepDiscussed || ""} onChange={e => set("sudepDiscussed", e.target.value)}>
          <option value="">Select…</option>
          <option>Yes — discussed with neurologist</option>
          <option>No — not yet discussed</option>
          <option>Unsure</option>
        </select>
      </div>

      <div className="info-box">
        <strong>SUDEP</strong> (Sudden Unexpected Death in Epilepsy) is a rare but important risk. 
        Discussing it with your neurologist helps ensure proper safety measures are in place, especially 
        regarding nighttime seizure monitoring and medication adherence.
      </div>

      {/* Rescue Medication */}
      <div className="form-group">
        <label>Rescue Medication</label>
        <select value={sp.rescueMedication || ""} onChange={e => set("rescueMedication", e.target.value)}>
          <option value="">Select…</option>
          {RESCUE_MEDICATIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {sp.rescueMedication && sp.rescueMedication !== "None prescribed" && (
        <div className="form-group">
          <label>Rescue Medication Details <span className="optional">(dose, when to use)</span></label>
          <textarea
            value={sp.rescueMedicationDetails || ""}
            onChange={e => set("rescueMedicationDetails", e.target.value)}
            placeholder="e.g. Administer if seizure lasts longer than 5 minutes. Dose: 0.2 mg/kg…"
          />
        </div>
      )}

      {/* Seizure Action Plan */}
      <div className="form-group">
        <label>Seizure Action Plan <span className="optional">(what others should do during a seizure)</span></label>
        <textarea
          value={sp.seizureActionPlan || ""}
          onChange={e => set("seizureActionPlan", e.target.value)}
          placeholder="e.g. Stay calm, time the seizure, turn on side, do NOT put anything in mouth, call 911 if seizure lasts >5 minutes or is unusual…"
        />
      </div>

      {/* Pregnancy Considerations — show prominently for female patients */}
      {isFemale && (
        <>
          <h3 style={{fontSize:"1.05rem",color:"var(--color-primary)",margin:"1.5rem 0 0.8rem",fontFamily:"var(--font-heading)"}}>
            Pregnancy &amp; Reproductive Considerations
          </h3>

          {hasTeratogenic && (
            <div className="warning-box">
              ⚠ You are currently on a medication with known teratogenic risk. Ensure your neurologist has discussed 
              pregnancy prevention and/or pre-conception planning with you.
            </div>
          )}

          <div className="form-group">
            <label>Pregnancy Considerations</label>
            <textarea
              value={sp.pregnancyConsiderations || ""}
              onChange={e => set("pregnancyConsiderations", e.target.value)}
              placeholder="e.g. Currently on contraception, planning pregnancy in 1 year, pre-conception counseling completed…"
            />
          </div>

          <div className="form-group">
            <label>Folic Acid Supplementation</label>
            <select value={sp.folicAcid || ""} onChange={e => set("folicAcid", e.target.value)}>
              <option value="">Select…</option>
              <option>Taking folic acid — standard dose (0.4–1 mg/day)</option>
              <option>Taking folic acid — high dose (4–5 mg/day)</option>
              <option>Not currently taking folic acid</option>
              <option>Not applicable</option>
            </select>
          </div>
        </>
      )}

      {/* Dietary Therapy */}
      <div className="form-group mt-2">
        <label>Dietary Therapy</label>
        <select value={sp.dietaryTherapy || ""} onChange={e => set("dietaryTherapy", e.target.value)}>
          <option value="">Select…</option>
          <option>Not on dietary therapy</option>
          <option>Classic ketogenic diet</option>
          <option>Modified Atkins diet</option>
          <option>Low glycemic index diet</option>
          <option>Medium-chain triglyceride (MCT) diet</option>
          <option>Other dietary therapy</option>
        </select>
      </div>

      {sp.dietaryTherapy && sp.dietaryTherapy !== "Not on dietary therapy" && sp.dietaryTherapy !== "" && (
        <div className="form-group">
          <label>Diet Details <span className="optional">(ratio, duration, dietitian contact)</span></label>
          <textarea
            value={sp.dietaryDetails || ""}
            onChange={e => set("dietaryDetails", e.target.value)}
            placeholder="e.g. 3:1 ratio ketogenic diet since 2022, managed by dietitian at X center…"
          />
        </div>
      )}

      {/* Catch-all notes */}
      <div className="form-group mt-2">
        <label>Additional Notes <span className="optional">(anything else important)</span></label>
        <textarea
          value={sp.additionalNotes || ""}
          onChange={e => set("additionalNotes", e.target.value)}
          placeholder="Any other information you'd like a new provider to know…"
        />
      </div>
    </div>
  );
}
