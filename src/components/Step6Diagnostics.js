import React from "react";
import { EEG_FINDINGS, MRI_FINDINGS, GENETIC_CLASSIFICATIONS } from "../data/clinicalData";

export default function Step6Diagnostics({ data, onChange }) {
  const diag = data.diagnostics || { eegs: [], mris: [], geneticTests: [], otherTests: [] };

  function setDiag(field, val) {
    onChange({ ...data, diagnostics: { ...diag, [field]: val } });
  }

  // Generic repeater helpers
  function addTo(field, template) {
    setDiag(field, [...(diag[field] || []), template]);
  }
  function updateIn(field, index, key, val) {
    const updated = (diag[field] || []).map((item, i) => i === index ? { ...item, [key]: val } : item);
    setDiag(field, updated);
  }
  function removeFrom(field, index) {
    setDiag(field, (diag[field] || []).filter((_, i) => i !== index));
  }

  return (
    <div className="step-card">
      <h2>Diagnostic Workup Summary</h2>
      <p className="step-description">
        Key test results. You don't need exact reports — a summary of the main findings is most useful for receiving clinicians.
      </p>

      {/* ── EEG ── */}
      <h3 style={{fontSize:"1.05rem",color:"var(--color-primary)",margin:"1.2rem 0 0.8rem",fontFamily:"var(--font-heading)"}}>EEG Studies</h3>
      {(diag.eegs || []).map((eeg, i) => (
        <div className="repeater-block" key={i}>
          <div className="repeater-header">
            <h4>EEG {i + 1}</h4>
            <button className="btn-remove" onClick={() => removeFrom("eegs", i)}>✕</button>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={eeg.date || ""} onChange={e => updateIn("eegs", i, "date", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Key Findings</label>
              <select value={eeg.findings || ""} onChange={e => updateIn("eegs", i, "findings", e.target.value)}>
                <option value="">Select…</option>
                {EEG_FINDINGS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Notes <span className="optional">(optional)</span></label>
            <input type="text" value={eeg.notes || ""} onChange={e => updateIn("eegs", i, "notes", e.target.value)} placeholder="Additional EEG details…" />
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={() => addTo("eegs", { date: "", findings: "", notes: "" })}>+ Add EEG</button>

      {/* ── MRI ── */}
      <h3 style={{fontSize:"1.05rem",color:"var(--color-primary)",margin:"1.5rem 0 0.8rem",fontFamily:"var(--font-heading)"}}>MRI Studies</h3>
      {(diag.mris || []).map((mri, i) => (
        <div className="repeater-block" key={i}>
          <div className="repeater-header">
            <h4>MRI {i + 1}</h4>
            <button className="btn-remove" onClick={() => removeFrom("mris", i)}>✕</button>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={mri.date || ""} onChange={e => updateIn("mris", i, "date", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Key Findings</label>
              <select value={mri.findings || ""} onChange={e => updateIn("mris", i, "findings", e.target.value)}>
                <option value="">Select…</option>
                {MRI_FINDINGS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Notes <span className="optional">(optional)</span></label>
            <input type="text" value={mri.notes || ""} onChange={e => updateIn("mris", i, "notes", e.target.value)} placeholder="Additional MRI details…" />
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={() => addTo("mris", { date: "", findings: "", notes: "" })}>+ Add MRI</button>

      {/* ── Genetic ── */}
      <h3 style={{fontSize:"1.05rem",color:"var(--color-primary)",margin:"1.5rem 0 0.8rem",fontFamily:"var(--font-heading)"}}>Genetic Testing</h3>
      {(diag.geneticTests || []).map((gt, i) => (
        <div className="repeater-block" key={i}>
          <div className="repeater-header">
            <h4>Genetic Result {i + 1}</h4>
            <button className="btn-remove" onClick={() => removeFrom("geneticTests", i)}>✕</button>
          </div>
          <div className="form-row-3">
            <div className="form-group">
              <label>Gene</label>
              <input type="text" value={gt.gene || ""} onChange={e => updateIn("geneticTests", i, "gene", e.target.value)} placeholder="e.g. SCN1A" />
            </div>
            <div className="form-group">
              <label>Variant</label>
              <input type="text" value={gt.variant || ""} onChange={e => updateIn("geneticTests", i, "variant", e.target.value)} placeholder="e.g. c.1234A>G" />
            </div>
            <div className="form-group">
              <label>Classification</label>
              <select value={gt.classification || ""} onChange={e => updateIn("geneticTests", i, "classification", e.target.value)}>
                <option value="">Select…</option>
                {GENETIC_CLASSIFICATIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={() => addTo("geneticTests", { gene: "", variant: "", classification: "" })}>+ Add Genetic Result</button>

      {/* ── Other ── */}
      <h3 style={{fontSize:"1.05rem",color:"var(--color-primary)",margin:"1.5rem 0 0.8rem",fontFamily:"var(--font-heading)"}}>Other Tests (PET, MEG, Neuropsych, etc.)</h3>
      {(diag.otherTests || []).map((ot, i) => (
        <div className="repeater-block" key={i}>
          <div className="repeater-header">
            <h4>Test {i + 1}</h4>
            <button className="btn-remove" onClick={() => removeFrom("otherTests", i)}>✕</button>
          </div>
          <div className="form-row-3">
            <div className="form-group">
              <label>Test Name</label>
              <input type="text" value={ot.testName || ""} onChange={e => updateIn("otherTests", i, "testName", e.target.value)} placeholder="e.g. FDG-PET, MEG" />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={ot.date || ""} onChange={e => updateIn("otherTests", i, "date", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Findings</label>
              <input type="text" value={ot.findings || ""} onChange={e => updateIn("otherTests", i, "findings", e.target.value)} placeholder="Summary of results" />
            </div>
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={() => addTo("otherTests", { testName: "", date: "", findings: "" })}>+ Add Other Test</button>
    </div>
  );
}
