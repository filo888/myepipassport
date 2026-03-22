const STORAGE_KEY = "epilepsy_passport_data";

export function loadPassportData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getEmptyPassport();
    return JSON.parse(raw);
  } catch {
    return getEmptyPassport();
  }
}

export function savePassportData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save:", e);
  }
}

export function exportPassportJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `epilepsy-passport-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importPassportJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch {
        reject(new Error("Invalid JSON file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

export function clearPassportData() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getEmptyPassport() {
  return {
    demographics: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      sex: "",
      emergencyContact1Name: "",
      emergencyContact1Phone: "",
      emergencyContact1Relation: "",
      emergencyContact2Name: "",
      emergencyContact2Phone: "",
      emergencyContact2Relation: "",
      primaryNeurologist: "",
      neurologistPhone: "",
      epilepsyCenter: "",
      insuranceInfo: ""
    },
    diagnosis: {
      epilepsyType: "",
      epilepsySyndrome: "",
      etiology: "",
      ageOfOnset: "",
      dateOfDiagnosis: "",
      diagnosisNotes: ""
    },
    seizureTypes: [],
    currentMedications: [],
    medicationHistory: [],
    diagnostics: {
      eegs: [],
      mris: [],
      geneticTests: [],
      otherTests: []
    },
    surgery: {
      hasSurgery: false,
      surgeries: [],
      neuromodulation: "None",
      neuromodulationDetails: "",
      presurgicalStatus: ""
    },
    comorbidities: {
      psychiatric: "",
      cognitive: "",
      neurological: "",
      otherMedical: "",
      notes: ""
    },
    currentStatus: {
      currentFrequency: "",
      lastSeizureDate: "",
      seizureFreedomDuration: "",
      drivingEligibility: "",
      employmentStatus: "",
      qualityOfLifePriorities: ""
    },
    specialConsiderations: {
      sudepDiscussed: "",
      rescueMedication: "",
      rescueMedicationDetails: "",
      seizureActionPlan: "",
      pregnancyConsiderations: "",
      folicAcid: "",
      dietaryTherapy: "",
      dietaryDetails: "",
      additionalNotes: ""
    },
    meta: {
      lastUpdated: new Date().toISOString(),
      version: "1.0.0"
    }
  };
}
