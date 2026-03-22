import React from "react";
import { generatePassportPDF } from "../utils/pdfGenerator";
import { exportPassportJSON } from "../utils/storage";

export default function Preview({ data }) {
  const d = data.demographics || {};
  const dx = data.diagnosis || {};
  const fullName = [d.firstName, d.lastName].filter(Boolean).join(" ") || "—";

  function handlePDF() {
    generatePassportPDF(data);
  }

  function handleJSON() {
    exportPassportJSON(data);
  }

  function handlePrint() {
    window.print();
  }

  function Row({ label, value }) {
    if (!value) return null;
    return (
      <div className="preview-row">
        <span className="label">{label}:</span>
        <span>{value}</span>
      </div>
    );
  }

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h2>EPILEPSY PASSPORT</h2>
        <p style={{opacity:0.85,marginTop:"0.2rem",fontSize:"0.9rem"}}>Comprehensive Epilepsy Medical Summary</p>
        <p style={{fontSize:"1.2rem",fontWeight:700,marginTop:"0.6rem"}}>{fullName}</p>
        {d.dateOfBirth && <p style={{opacity:0.8,fontSize:"0.85rem"}}>DOB: {d.dateOfBirth}</p>}
      </div>

      {/* Export bar */}
      <div className="export-bar">
        <button className="btn btn-primary" onClick={handlePDF}>📄 Download PDF</button>
        <button className="btn btn-secondary" onClick={handleJSON}>💾 Export JSON</button>
        <button className="btn btn-secondary" onClick={handlePrint}>🖨 Print</button>
      </div>

      {/* Demographics */}
      <div className="preview-section">
        <h3>Demographics &amp; Emergency Contacts</h3>
        <Row label="Name" value={fullName} />
        <Row label="Date of Birth" value={d.dateOfBirth} />
        <Row label="Sex" value={d.sex} />
        <Row label="Primary Neurologist" value={d.primaryNeurologist} />
        <Row label="Neurologist Phone" value={d.neurologistPhone} />
        <Row label="Epilepsy Center" value={d.epilepsyCenter} />
        {d.emergencyContact1Name && (
          <>
            <div style={{fontWeight:600,fontSize:"0.85rem",color:"var(--color-accent)",marginTop:"0.5rem"}}>Emergency Contact 1</div>
            <Row label="Name" value={d.emergencyContact1Name} />
            <Row label="Phone" value={d.emergencyContact1Phone} />
            <Row label="Relationship" value={d.emergencyContact1Relation} />
          </>
        )}
        {d.emergencyContact2Name && (
          <>
            <div style={{fontWeight:600,fontSize:"0.85rem",color:"var(--color-accent)",marginTop:"0.5rem"}}>Emergency Contact 2</div>
            <Row label="Name" value={d.emergencyContact2Name} />
            <Row label="Phone" value={d.emergencyContact2Phone} />
            <Row label="Relationship" value={d.emergencyContact2Relation} />
          </>
        )}
      </div>

      {/* Diagnosis */}
      <div className="preview-section">
        <h3>Epilepsy Diagnosis Summary</h3>
        <Row label="Epilepsy Type" value={dx.epilepsyType} />
        <Row label="Syndrome" value={dx.epilepsySyndrome} />
        <Row label="Etiology" value={dx.etiology} />
        <Row label="Age of Onset" value={dx.ageOfOnset} />
        <Row label="Date of Diagnosis" value={dx.dateOfDiagnosis} />
        <Row label="Notes" value={dx.diagnosisNotes} />
      </div>

      {/* Seizure Types */}
      {data.seizureTypes?.length > 0 && (
        <div className="preview-section">
          <h3>Seizure Types &amp; Semiology</h3>
          {data.seizureTypes.map((sz, i) => (
            <div key={i} style={{marginBottom:"0.8rem",paddingLeft:"0.5rem",borderLeft:"3px solid var(--color-accent)"}}>
              <div style={{fontWeight:600,fontSize:"0.88rem",color:"var(--color-primary)"}}>
                {sz.classification || `Seizure Type ${i + 1}`}
              </div>
              <Row label="Duration" value={sz.duration} />
              <Row label="Frequency" value={sz.frequency} />
              <Row label="Aura" value={sz.aura} />
              <Row label="Patient Description" value={sz.description} />
            </div>
          ))}
        </div>
      )}

      {/* Current Medications */}
      {data.currentMedications?.length > 0 && (
        <div className="preview-section">
          <h3>Current Medications</h3>
          <table className="preview-table">
            <thead>
              <tr>
                <th>Medication</th>
                <th>Dose</th>
                <th>Frequency</th>
                <th>Blood Level</th>
                <th>Start Date</th>
                <th>Effectiveness</th>
              </tr>
            </thead>
            <tbody>
              {data.currentMedications.map((m, i) => (
                <tr key={i}>
                  <td>{m.name}</td>
                  <td>{m.dose}</td>
                  <td>{m.frequency}</td>
                  <td>{m.level || "—"}</td>
                  <td>{m.startDate}</td>
                  <td>{m.effectiveness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Medication History */}
      {data.medicationHistory?.length > 0 && (
        <div className="preview-section">
          <h3>Medication History (All Prior ASMs)</h3>
          <table className="preview-table">
            <thead>
              <tr>
                <th>Medication</th>
                <th>Peak Dose</th>
                <th>Duration</th>
                <th>Reason Stopped</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.medicationHistory.map((m, i) => (
                <tr key={i}>
                  <td>{m.name}</td>
                  <td>{m.peakDose}</td>
                  <td>{m.duration}</td>
                  <td>{m.reason}</td>
                  <td>{m.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Diagnostics */}
      {(() => {
        const diag = data.diagnostics || {};
        const has = diag.eegs?.length || diag.mris?.length || diag.geneticTests?.length || diag.otherTests?.length;
        if (!has) return null;
        return (
          <div className="preview-section">
            <h3>Diagnostic Workup Summary</h3>
            {diag.eegs?.length > 0 && (
              <>
                <div style={{fontWeight:600,fontSize:"0.85rem",color:"var(--color-accent)",marginBottom:"0.3rem"}}>EEG Studies</div>
                {diag.eegs.map((e, i) => (
                  <div key={i} style={{paddingLeft:"0.5rem",marginBottom:"0.5rem"}}>
                    <Row label="Date" value={e.date} />
                    <Row label="Findings" value={e.findings} />
                    {e.notes && <Row label="Notes" value={e.notes} />}
                  </div>
                ))}
              </>
            )}
            {diag.mris?.length > 0 && (
              <>
                <div style={{fontWeight:600,fontSize:"0.85rem",color:"var(--color-accent)",marginBottom:"0.3rem",marginTop:"0.5rem"}}>MRI Studies</div>
                {diag.mris.map((m, i) => (
                  <div key={i} style={{paddingLeft:"0.5rem",marginBottom:"0.5rem"}}>
                    <Row label="Date" value={m.date} />
                    <Row label="Findings" value={m.findings} />
                    {m.notes && <Row label="Notes" value={m.notes} />}
                  </div>
                ))}
              </>
            )}
            {diag.geneticTests?.length > 0 && (
              <>
                <div style={{fontWeight:600,fontSize:"0.85rem",color:"var(--color-accent)",marginBottom:"0.3rem",marginTop:"0.5rem"}}>Genetic Testing</div>
                {diag.geneticTests.map((g, i) => (
                  <div key={i} style={{paddingLeft:"0.5rem",marginBottom:"0.5rem"}}>
                    <Row label="Gene" value={g.gene} />
                    <Row label="Variant" value={g.variant} />
                    <Row label="Classification" value={g.classification} />
                  </div>
                ))}
              </>
            )}
            {diag.otherTests?.length > 0 && (
              <>
                <div style={{fontWeight:600,fontSize:"0.85rem",color:"var(--color-accent)",marginBottom:"0.3rem",marginTop:"0.5rem"}}>Other Tests</div>
                {diag.otherTests.map((t, i) => (
                  <div key={i} style={{paddingLeft:"0.5rem",marginBottom:"0.5rem"}}>
                    <Row label="Test" value={t.testName} />
                    <Row label="Date" value={t.date} />
                    <Row label="Findings" value={t.findings} />
                  </div>
                ))}
              </>
            )}
          </div>
        );
      })()}

      {/* Surgery */}
      {(() => {
        const surg = data.surgery || {};
        if (!surg.hasSurgery && surg.neuromodulation === "None") return null;
        return (
          <div className="preview-section">
            <h3>Surgical History &amp; Neuromodulation</h3>
            {surg.surgeries?.map((s, i) => (
              <div key={i} style={{paddingLeft:"0.5rem",marginBottom:"0.5rem"}}>
                <Row label="Procedure" value={s.type} />
                <Row label="Date" value={s.date} />
                <Row label="Outcome" value={s.outcome} />
              </div>
            ))}
            <Row label="Neuromodulation" value={surg.neuromodulation} />
            <Row label="Device Details" value={surg.neuromodulationDetails} />
            <Row label="Presurgical Status" value={surg.presurgicalStatus} />
          </div>
        );
      })()}

      {/* Comorbidities */}
      {(() => {
        const co = data.comorbidities || {};
        if (!co.psychiatric && !co.cognitive && !co.neurological && !co.otherMedical) return null;
        return (
          <div className="preview-section">
            <h3>Comorbidities</h3>
            <Row label="Psychiatric" value={co.psychiatric} />
            <Row label="Cognitive / Developmental" value={co.cognitive} />
            <Row label="Other Neurological" value={co.neurological} />
            <Row label="Other Medical" value={co.otherMedical} />
            <Row label="Notes" value={co.notes} />
          </div>
        );
      })()}

      {/* Current Status */}
      <div className="preview-section">
        <h3>Current Status &amp; Goals</h3>
        <Row label="Seizure Frequency" value={data.currentStatus?.currentFrequency} />
        <Row label="Last Seizure" value={data.currentStatus?.lastSeizureDate} />
        <Row label="Seizure-Free Duration" value={data.currentStatus?.seizureFreedomDuration} />
        <Row label="Driving" value={data.currentStatus?.drivingEligibility} />
        <Row label="Employment / School" value={data.currentStatus?.employmentStatus} />
        <Row label="QoL Priorities" value={data.currentStatus?.qualityOfLifePriorities} />
      </div>

      {/* Special Considerations */}
      {(() => {
        const sp = data.specialConsiderations || {};
        const has = sp.sudepDiscussed || sp.rescueMedication || sp.seizureActionPlan || sp.pregnancyConsiderations || sp.dietaryTherapy;
        if (!has) return null;
        return (
          <div className="preview-section">
            <h3>Special Considerations</h3>
            <Row label="SUDEP Discussed" value={sp.sudepDiscussed} />
            <Row label="Rescue Medication" value={sp.rescueMedication} />
            <Row label="Rescue Details" value={sp.rescueMedicationDetails} />
            <Row label="Seizure Action Plan" value={sp.seizureActionPlan} />
            <Row label="Pregnancy" value={sp.pregnancyConsiderations} />
            <Row label="Folic Acid" value={sp.folicAcid} />
            <Row label="Dietary Therapy" value={sp.dietaryTherapy} />
            <Row label="Diet Details" value={sp.dietaryDetails} />
            <Row label="Additional Notes" value={sp.additionalNotes} />
          </div>
        );
      })()}

      {/* Bottom export bar */}
      <div style={{borderTop:"1px solid var(--color-border)",paddingTop:"1.2rem",marginTop:"1.5rem"}}>
        <div className="export-bar">
          <button className="btn btn-primary" onClick={handlePDF}>📄 Download PDF</button>
          <button className="btn btn-secondary" onClick={handleJSON}>💾 Export JSON</button>
          <button className="btn btn-secondary" onClick={handlePrint}>🖨 Print</button>
        </div>
        <p className="text-muted text-center">
          Last updated: {new Date(data.meta?.lastUpdated || Date.now()).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
