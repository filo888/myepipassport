// ILAE 2017 Seizure Classification
const SEIZURE_TYPES = {
  focal: {
    label: "Focal Onset",
    subtypes: [
      "Focal aware — motor onset",
      "Focal aware — non-motor onset (sensory, cognitive, emotional, autonomic)",
      "Focal impaired awareness — motor onset",
      "Focal impaired awareness — non-motor onset",
      "Focal to bilateral tonic-clonic",
    ]
  },
  generalized: {
    label: "Generalized Onset",
    subtypes: [
      "Generalized tonic-clonic",
      "Absence — typical",
      "Absence — atypical",
      "Absence — myoclonic",
      "Absence — eyelid myoclonia",
      "Myoclonic",
      "Myoclonic-tonic-clonic",
      "Myoclonic-atonic",
      "Atonic",
      "Tonic",
      "Clonic",
      "Epileptic spasms",
    ]
  },
  unknown: {
    label: "Unknown Onset",
    subtypes: [
      "Unknown onset — tonic-clonic",
      "Unknown onset — epileptic spasms",
      "Unknown onset — other",
    ]
  }
};

const EPILEPSY_TYPES = [
  "Focal epilepsy",
  "Generalized epilepsy",
  "Combined generalized and focal epilepsy",
  "Unknown whether focal or generalized"
];

const EPILEPSY_SYNDROMES = [
  "Not applicable / Unknown",
  "Childhood absence epilepsy (CAE)",
  "Juvenile absence epilepsy (JAE)",
  "Juvenile myoclonic epilepsy (JME)",
  "Generalized tonic-clonic seizures alone (GTCA)",
  "Self-limited epilepsy with centrotemporal spikes (SeLECTS)",
  "Self-limited epilepsy with autonomic seizures (SeLEAS)",
  "Childhood occipital visual epilepsy (COVE)",
  "Photosensitive occipital lobe epilepsy (POLE)",
  "Mesial temporal lobe epilepsy with hippocampal sclerosis (MTLE-HS)",
  "Sleep-related hypermotor epilepsy (SHE)",
  "Familial mesial temporal lobe epilepsy (FMTLE)",
  "Epilepsy with reading-induced seizures",
  "West syndrome / Infantile spasms syndrome",
  "Dravet syndrome",
  "Lennox-Gastaut syndrome (LGS)",
  "Epilepsy with myoclonic-atonic seizures (Doose syndrome)",
  "Epileptic encephalopathy with spike-and-wave activation in sleep (EE-SWAS)",
  "Landau-Kleffner syndrome (LKS)",
  "Febrile seizures plus (FS+) / GEFS+",
  "Progressive myoclonus epilepsy",
  "Rasmussen syndrome",
  "Hypothalamic hamartoma with gelastic seizures",
  "Tuberous sclerosis complex–associated epilepsy",
  "Sturge-Weber syndrome–associated epilepsy",
  "Other (specify in notes)"
];

const ETIOLOGIES = [
  "Genetic",
  "Structural",
  "Metabolic",
  "Immune",
  "Infectious",
  "Unknown",
  "Multiple / Combined"
];

// Common EEG findings for dropdown helpers
const EEG_FINDINGS = [
  "Normal",
  "Focal slowing — left temporal",
  "Focal slowing — right temporal",
  "Focal slowing — left frontal",
  "Focal slowing — right frontal",
  "Focal slowing — other region",
  "Generalized 3 Hz spike-and-wave",
  "Generalized polyspike-and-wave",
  "Generalized spike-and-wave (other frequency)",
  "Left temporal sharp waves / spikes",
  "Right temporal sharp waves / spikes",
  "Left frontal sharp waves / spikes",
  "Right frontal sharp waves / spikes",
  "Bilateral independent temporal spikes",
  "Centrotemporal spikes (rolandic)",
  "Occipital spikes",
  "Multifocal epileptiform discharges",
  "Hypsarrhythmia",
  "Burst-suppression pattern",
  "Electrographic seizures recorded",
  "Photoparoxysmal response",
  "Generalized background slowing",
  "Other (specify in notes)"
];

// Common MRI findings
const MRI_FINDINGS = [
  "Normal",
  "Mesial temporal sclerosis — left",
  "Mesial temporal sclerosis — right",
  "Mesial temporal sclerosis — bilateral",
  "Focal cortical dysplasia (FCD) — specify location",
  "Polymicrogyria",
  "Heterotopia (gray matter)",
  "Lissencephaly / pachygyria",
  "Schizencephaly",
  "Tuberous sclerosis — cortical tubers",
  "Cavernous malformation (cavernoma)",
  "Arteriovenous malformation (AVM)",
  "Low-grade tumor (e.g., DNET, ganglioglioma)",
  "High-grade tumor",
  "Encephalomalacia / gliosis (post-injury)",
  "Hippocampal volume loss",
  "Arachnoid cyst",
  "Porencephalic cyst",
  "White matter abnormalities",
  "Hypothalamic hamartoma",
  "Rasmussen encephalitis findings",
  "Sturge-Weber — leptomeningeal enhancement",
  "Post-surgical changes",
  "Other (specify in notes)"
];

const GENETIC_CLASSIFICATIONS = [
  "Pathogenic",
  "Likely pathogenic",
  "Variant of uncertain significance (VUS)",
  "Likely benign",
  "Benign",
  "Not tested"
];

const SURGERY_TYPES = [
  "Anterior temporal lobectomy — left",
  "Anterior temporal lobectomy — right",
  "Selective amygdalohippocampectomy — left",
  "Selective amygdalohippocampectomy — right",
  "Frontal lobe resection",
  "Parietal lobe resection",
  "Occipital lobe resection",
  "Lesionectomy",
  "Hemispherectomy / hemispherotomy",
  "Corpus callosotomy — partial",
  "Corpus callosotomy — complete",
  "Multiple subpial transections",
  "Laser interstitial thermal therapy (LITT)",
  "Stereotactic radiosurgery (Gamma Knife)",
  "Thermocoagulation (SEEG-guided)",
  "Other (specify in notes)"
];

const NEUROMODULATION_DEVICES = [
  "Vagus nerve stimulator (VNS)",
  "Responsive neurostimulation (RNS / NeuroPace)",
  "Deep brain stimulation (DBS)",
  "None"
];

const SEIZURE_FREQUENCIES = [
  "Seizure-free",
  "Less than 1 per year",
  "1–3 per year",
  "4–11 per year (monthly)",
  "1–6 per month (weekly)",
  "1–6 per week (daily)",
  "Daily",
  "Multiple per day",
  "Status epilepticus risk",
  "Unknown / unmonitored"
];

const RESCUE_MEDICATIONS = [
  "Diazepam nasal spray (Valtoco)",
  "Diazepam rectal gel (Diastat)",
  "Midazolam nasal spray (Nayzilam)",
  "Midazolam buccal (Buccolam)",
  "Lorazepam (oral / sublingual)",
  "None prescribed",
  "Other (specify in notes)"
];

export {
  SEIZURE_TYPES,
  EPILEPSY_TYPES,
  EPILEPSY_SYNDROMES,
  ETIOLOGIES,
  EEG_FINDINGS,
  MRI_FINDINGS,
  GENETIC_CLASSIFICATIONS,
  SURGERY_TYPES,
  NEUROMODULATION_DEVICES,
  SEIZURE_FREQUENCIES,
  RESCUE_MEDICATIONS
};
