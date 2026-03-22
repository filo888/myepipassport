import React, { useState, useEffect, useCallback } from "react";
import "./styles/App.css";

import { loadPassportData, savePassportData, clearPassportData } from "./utils/storage";

import Landing from "./components/Landing";
import Step1Demographics from "./components/Step1Demographics";
import Step2Diagnosis from "./components/Step2Diagnosis";
import Step3SeizureTypes from "./components/Step3SeizureTypes";
import Step4CurrentMeds from "./components/Step4CurrentMeds";
import Step5MedHistory from "./components/Step5MedHistory";
import Step6Diagnostics from "./components/Step6Diagnostics";
import Step7Surgery from "./components/Step7Surgery";
import Step8Comorbidities from "./components/Step8Comorbidities";
import Step9CurrentStatus from "./components/Step9CurrentStatus";
import Step10Special from "./components/Step10Special";
import Preview from "./components/Preview";

const STEPS = [
  { id: 1, label: "Demographics", short: "Info" },
  { id: 2, label: "Diagnosis", short: "Dx" },
  { id: 3, label: "Seizure Types", short: "Seizures" },
  { id: 4, label: "Current Meds", short: "Meds" },
  { id: 5, label: "Med History", short: "History" },
  { id: 6, label: "Diagnostics", short: "Tests" },
  { id: 7, label: "Surgery", short: "Surgery" },
  { id: 8, label: "Comorbidities", short: "Comorbid" },
  { id: 9, label: "Current Status", short: "Status" },
  { id: 10, label: "Special", short: "Special" },
  { id: 11, label: "Preview", short: "Preview" },
];

export default function App() {
  const [data, setData] = useState(() => loadPassportData());
  const [step, setStep] = useState(0); // 0 = landing
  const [visited, setVisited] = useState(new Set());

  // Auto-save on every change
  useEffect(() => {
    if (step > 0) {
      const updated = { ...data, meta: { ...data.meta, lastUpdated: new Date().toISOString() } };
      savePassportData(updated);
    }
  }, [data, step]);

  const updateData = useCallback((newData) => {
    setData(newData);
  }, []);

  function goTo(s) {
    setStep(s);
    if (s > 0) setVisited(prev => new Set([...prev, s]));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() { if (step < 11) goTo(step + 1); }
  function prev() { if (step > 1) goTo(step - 1); }

  function handleStart() {
    goTo(1);
  }

  function handleImport(imported) {
    setData(imported);
    savePassportData(imported);
    goTo(1);
  }

  function handleReset() {
    if (window.confirm("Are you sure you want to delete ALL passport data? This cannot be undone.")) {
      clearPassportData();
      setData(loadPassportData());
      setStep(0);
      setVisited(new Set());
    }
  }

  // Detect if user has existing data
  const hasExistingData = data.demographics?.firstName || data.demographics?.lastName;

  // Landing screen
  if (step === 0) {
    return (
      <>
        <header className="app-header">
          <h1>Epilepsy Passport</h1>
          <p>Open-Source Medical Summary Generator</p>
        </header>
        <div className="app-container">
          {hasExistingData && (
            <div className="info-box" style={{marginBottom:"1rem",textAlign:"center"}}>
              <strong>Welcome back!</strong> You have an existing passport for {data.demographics.firstName} {data.demographics.lastName}.{" "}
              <button
                className="btn btn-sm btn-primary"
                style={{marginLeft:"0.5rem"}}
                onClick={() => goTo(1)}
              >
                Continue Editing
              </button>
            </div>
          )}
          <Landing onStart={handleStart} onImport={handleImport} />
        </div>
      </>
    );
  }

  // Render current step
  function renderStep() {
    switch (step) {
      case 1: return <Step1Demographics data={data} onChange={updateData} />;
      case 2: return <Step2Diagnosis data={data} onChange={updateData} />;
      case 3: return <Step3SeizureTypes data={data} onChange={updateData} />;
      case 4: return <Step4CurrentMeds data={data} onChange={updateData} />;
      case 5: return <Step5MedHistory data={data} onChange={updateData} />;
      case 6: return <Step6Diagnostics data={data} onChange={updateData} />;
      case 7: return <Step7Surgery data={data} onChange={updateData} />;
      case 8: return <Step8Comorbidities data={data} onChange={updateData} />;
      case 9: return <Step9CurrentStatus data={data} onChange={updateData} />;
      case 10: return <Step10Special data={data} onChange={updateData} />;
      case 11: return <Preview data={data} />;
      default: return null;
    }
  }

  return (
    <>
      <header className="app-header">
        <h1>Epilepsy Passport</h1>
        <p>Open-Source Medical Summary Generator</p>
      </header>

      <div className="app-container">
        {/* Progress bar */}
        <div className="progress-bar" role="navigation" aria-label="Form progress">
          {STEPS.map((s) => {
            const isActive = step === s.id;
            const isCompleted = visited.has(s.id) && step > s.id;
            return (
              <div
                key={s.id}
                className={`progress-step${isActive ? " active" : ""}${isCompleted ? " completed" : ""}`}
                onClick={() => goTo(s.id)}
                title={s.label}
                role="button"
                tabIndex={0}
                aria-current={isActive ? "step" : undefined}
                onKeyDown={e => { if (e.key === "Enter") goTo(s.id); }}
              >
                <div className="progress-dot">
                  {isCompleted ? "✓" : s.id}
                </div>
                <span className="progress-label">{s.short}</span>
              </div>
            );
          })}
        </div>

        {/* Step content */}
        {renderStep()}

        {/* Navigation */}
        {step <= 10 && (
          <div className="nav-buttons">
            <button className="btn btn-secondary" onClick={step === 1 ? () => goTo(0) : prev}>
              {step === 1 ? "← Home" : "← Back"}
            </button>
            <div style={{display:"flex",gap:"0.5rem"}}>
              {step < 11 && (
                <button className="btn btn-primary" onClick={next}>
                  {step === 10 ? "Preview Passport →" : "Next →"}
                </button>
              )}
            </div>
          </div>
        )}

        {step === 11 && (
          <div className="nav-buttons">
            <button className="btn btn-secondary" onClick={() => goTo(10)}>← Back to Editing</button>
            <button className="btn btn-danger btn-sm" onClick={handleReset}>Reset All Data</button>
          </div>
        )}

        {/* Footer */}
        <div style={{textAlign:"center",marginTop:"2rem",paddingTop:"1rem",borderTop:"1px solid var(--color-border)"}}>
          <p className="text-muted" style={{fontSize:"0.75rem"}}>
            Epilepsy Passport Generator — Free &amp; Open Source (MIT License)<br/>
            No data leaves your device. No accounts. No tracking.<br/>
            <a href="https://github.com/yourusername/epilepsy-passport" target="_blank" rel="noopener noreferrer" style={{color:"var(--color-accent)"}}>
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
