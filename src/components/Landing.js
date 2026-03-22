import React, { useRef } from "react";
import { importPassportJSON } from "../utils/storage";

export default function Landing({ onStart, onImport }) {
  const fileRef = useRef();

  async function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = await importPassportJSON(file);
      onImport(data);
    } catch (err) {
      alert("Could not import file: " + err.message);
    }
  }

  return (
    <div className="landing">
      <div style={{fontSize:"3rem",marginBottom:"0.5rem"}}>🧠</div>
      <h2>Epilepsy Passport Generator</h2>
      <p>
        Create a free, portable, professional epilepsy medical summary. 
        Hand it to any new doctor, ER, school, or caregiver — so your full history is never lost.
      </p>

      <div className="landing-features">
        <div className="feature-card">
          <div className="icon">🔒</div>
          <h3>100% Private</h3>
          <p>All data stays in your browser. No accounts, no servers, no tracking. Nothing leaves your device unless you choose to export.</p>
        </div>
        <div className="feature-card">
          <div className="icon">📋</div>
          <h3>Clinically Structured</h3>
          <p>Follows ILAE classification standards. Designed to be scanned by a neurologist in under 2 minutes.</p>
        </div>
        <div className="feature-card">
          <div className="icon">📄</div>
          <h3>PDF &amp; Print Ready</h3>
          <p>Generate a professional PDF document you can print, email, or carry on your phone.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🌍</div>
          <h3>Free &amp; Open Source</h3>
          <p>MIT licensed. No cost, no ads, no data collection. Built by the community, for the community.</p>
        </div>
      </div>

      <div className="landing-actions">
        <button className="btn btn-primary" onClick={onStart} style={{padding:"0.8rem 2rem",fontSize:"1rem"}}>
          Create Your Passport
        </button>
        <button className="btn btn-secondary" onClick={() => fileRef.current.click()} style={{padding:"0.8rem 1.5rem"}}>
          Import Existing (JSON)
        </button>
        <input ref={fileRef} type="file" accept=".json" style={{display:"none"}} onChange={handleImport} />
      </div>

      <p className="text-muted" style={{marginTop:"2rem",fontSize:"0.78rem"}}>
        This tool does not provide medical advice. Always consult your neurologist for clinical decisions.<br />
        Your data is stored only in this browser's local storage. Clearing browser data will delete it — use the export feature to keep a backup.
      </p>
    </div>
  );
}
