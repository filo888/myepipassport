# My Epilepsy Passport Generator

**Free, private, open-source tool to create a portable epilepsy medical summary.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## What Is This?

When patients with epilepsy switch doctors — from pediatric to adult neurology, between hospitals, across borders, or during ER visits — critical information gets lost. Medication histories disappear, failed drug trials are repeated, and contraindicated medications are restarted.

**Epilepsy Passport** solves this. Patients (or caregivers) fill in a guided form, and the app generates a clean, printable PDF document that can be handed to any healthcare provider.

### Key Features

- **100% Private** — All data stays in your browser (localStorage). No server, no accounts, no analytics, no cookies
- **Clinically Structured** — Follows ILAE 2017 classification. Designed for a neurologist to scan in under 2 minutes
- **Smart Dropdowns** — ASM autocomplete with 30+ medications, ILAE seizure types, EEG/MRI finding templates
- **Safety Alerts** — Warns about valproate in women of reproductive age, prompts for folic acid documentation
- **PDF Export** — Professional, print-ready PDF with tables, headers, and clean typography
- **JSON Export/Import** — Move your data between devices without any server
- **Works Offline** — Pure client-side app, works without internet after first load

---

## Passport Sections

1. Demographics & Emergency Contacts
2. Epilepsy Diagnosis Summary (ILAE type, syndrome, etiology)
3. Seizure Types & Semiology
4. Current Medications
5. **Medication History** — the most critical and most often lost data
6. Diagnostic Workup (EEG, MRI, genetic testing, other)
7. Surgical History & Neuromodulation
8. Comorbidities
9. Current Status & Goals
10. Special Considerations (SUDEP, rescue meds, pregnancy, dietary therapy)

---

## Quick Start (For Users)

Visit the hosted version :

> **https://yourusername.github.io/epilepsy-passport**

No installation needed. Just open the website and start filling in the form.

---

## Project Structure

```
epilepsy-passport/
├── public/
│   ├── index.html          # HTML shell
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/
│   │   ├── Landing.js       # Home screen
│   │   ├── Step1Demographics.js
│   │   ├── Step2Diagnosis.js
│   │   ├── Step3SeizureTypes.js
│   │   ├── Step4CurrentMeds.js
│   │   ├── Step5MedHistory.js
│   │   ├── Step6Diagnostics.js
│   │   ├── Step7Surgery.js
│   │   ├── Step8Comorbidities.js
│   │   ├── Step9CurrentStatus.js
│   │   ├── Step10Special.js
│   │   ├── Preview.js        # Full passport preview + export
│   │   └── ASMAutocomplete.js # Medication search component
│   ├── data/
│   │   ├── asmDatabase.js    # 30+ ASMs with brands & dose ranges
│   │   └── clinicalData.js   # ILAE classifications, EEG/MRI findings
│   ├── utils/
│   │   ├── storage.js        # localStorage persistence
│   │   └── pdfGenerator.js   # Client-side PDF generation
│   ├── styles/
│   │   └── App.css           # All styles
│   ├── App.js                # Main wizard controller
│   └── index.js              # Entry point
├── package.json
├── LICENSE                   # MIT License
└── README.md
```

---

## Contributing

Contributions are welcome! Here's how to help:

- **Add medications** — Edit `src/data/asmDatabase.js`
- **Add translations** — We plan to add i18n support; open an issue if you can translate
- **Improve the PDF** — Edit `src/utils/pdfGenerator.js`
- **Fix bugs** — Open an issue or submit a pull request
- **Clinical review** — If you're a neurologist or epileptologist, we'd love your feedback on completeness and accuracy

### Contribution steps

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

---

## Privacy & Security

- **No server.** The app is a static bundle of HTML/CSS/JS.
- **No database.** All data lives in your browser's localStorage.
- **No analytics.** No Google Analytics, no tracking pixels, no cookies.
- **No accounts.** Nothing to sign up for.
- **Zero data transmission.** Nothing leaves your device unless you click "Download PDF" or "Export JSON" — and those files go only to your device.

This architecture means HIPAA and GDPR concerns are eliminated by design.

---

## Disclaimer

This tool is **not a medical device** and does **not provide medical advice**. It is a documentation tool to help patients organize and share their medical history. Always consult your neurologist or healthcare provider for clinical decisions.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- **ILAE** (International League Against Epilepsy) for seizure classification standards
- **jsPDF** for client-side PDF generation
- Built with React and hosted on GitHub Pages
