import type {
  DashboardAlert,
  DashboardMetric,
  DashboardTrendItem,
  FacilitySummary,
  PatientRiskSummary,
  RiskMixItem,
  ScreeningQuestion,
  TriageItem
} from "@/lib/types";

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Total screenings",
    value: "428",
    detail: "Last 30 days across active sites"
  },
  {
    label: "High risk",
    value: "46",
    detail: "Includes 9 same-day reviews"
  },
  {
    label: "Medium risk",
    value: "138",
    detail: "Needs planned follow-up"
  },
  {
    label: "Low risk",
    value: "244",
    detail: "Routine guidance or monitoring"
  },
  {
    label: "Follow-up pending",
    value: "63",
    detail: "19 overdue beyond target window"
  }
];

export const dashboardTrend: DashboardTrendItem[] = [
  { day: "Mon", screenings: 42, highRisk: 5, mediumRisk: 12, lowRisk: 25, followUpPending: 8 },
  { day: "Tue", screenings: 58, highRisk: 8, mediumRisk: 18, lowRisk: 32, followUpPending: 12 },
  { day: "Wed", screenings: 51, highRisk: 7, mediumRisk: 15, lowRisk: 29, followUpPending: 10 },
  { day: "Thu", screenings: 64, highRisk: 9, mediumRisk: 21, lowRisk: 34, followUpPending: 14 },
  { day: "Fri", screenings: 49, highRisk: 6, mediumRisk: 14, lowRisk: 29, followUpPending: 9 },
  { day: "Sat", screenings: 31, highRisk: 3, mediumRisk: 9, lowRisk: 19, followUpPending: 6 },
  { day: "Sun", screenings: 24, highRisk: 2, mediumRisk: 7, lowRisk: 15, followUpPending: 4 }
];

export const dashboardRiskMix: RiskMixItem[] = [
  { label: "High risk", value: 46, level: "high" },
  { label: "Medium risk", value: 138, level: "medium" },
  { label: "Low risk", value: 244, level: "low" }
];

export const facilitySummaries: FacilitySummary[] = [
  {
    name: "Kisumu outreach clinic",
    programme: "Community mental health",
    screenings: 118,
    highRisk: 14,
    followUpPending: 21,
    dataCompleteness: "92%"
  },
  {
    name: "Nairobi primary care",
    programme: "Integrated primary care",
    screenings: 136,
    highRisk: 17,
    followUpPending: 18,
    dataCompleteness: "96%"
  },
  {
    name: "Eldoret county clinic",
    programme: "Functional risk review",
    screenings: 84,
    highRisk: 9,
    followUpPending: 16,
    dataCompleteness: "88%"
  },
  {
    name: "Mombasa clinic",
    programme: "Routine screening",
    screenings: 90,
    highRisk: 6,
    followUpPending: 8,
    dataCompleteness: "97%"
  }
];

export const dashboardAlerts: DashboardAlert[] = [
  {
    title: "19 follow-ups are overdue",
    detail: "Prioritize patient contact lists for Kisumu and Eldoret today.",
    severity: "critical"
  },
  {
    title: "Data completeness below target at Eldoret",
    detail: "Functional assessment fields are missing in 12% of records.",
    severity: "warning"
  },
  {
    title: "High-risk load increased this week",
    detail: "Review staffing coverage for same-day clinician review.",
    severity: "info"
  }
];

export const triageQueue: TriageItem[] = [
  {
    patientId: "MC-014",
    riskLevel: "urgent",
    score: 86,
    concern: "Safety flag and severe distress",
    nextAction: "Immediate clinician review",
    owner: "Dr. Achieng",
    waiting: "18 min",
    site: "Kisumu outreach clinic",
    screeningTime: "Today, 09:42",
    screeningTimestamp: 1776764520,
    referralUrgency: "Same-day crisis pathway check",
    priority: 98,
    missingDataFlags: ["Medication history", "Emergency contact"],
    followUpStatus: "pending",
    followUpDetail: "Clinician review not yet documented"
  },
  {
    patientId: "MC-011",
    riskLevel: "high",
    score: 74,
    concern: "Cognitive and functional decline",
    nextAction: "Referral planning",
    owner: "Nurse Wanjiku",
    waiting: "2 hr",
    site: "Nairobi primary care",
    screeningTime: "Today, 08:18",
    screeningTimestamp: 1776759480,
    referralUrgency: "Priority specialist referral",
    priority: 82,
    missingDataFlags: ["Collateral history"],
    followUpStatus: "scheduled",
    followUpDetail: "Follow-up planned for tomorrow"
  },
  {
    patientId: "MC-008",
    riskLevel: "moderate",
    score: 51,
    concern: "Low mood and follow-up gap",
    nextAction: "Schedule follow-up",
    owner: "CHW Otieno",
    waiting: "1 day",
    site: "Community visit",
    screeningTime: "Yesterday, 14:06",
    screeningTimestamp: 1776693960,
    referralUrgency: "Routine follow-up within 14 days",
    priority: 54,
    missingDataFlags: [],
    followUpStatus: "overdue",
    followUpDetail: "Phone follow-up missed"
  },
  {
    patientId: "MC-006",
    riskLevel: "low",
    score: 24,
    concern: "Routine screening",
    nextAction: "Provide guidance",
    owner: "Clinic team",
    waiting: "2 days",
    site: "Mombasa clinic",
    screeningTime: "Apr 19, 11:30",
    screeningTimestamp: 1776576600,
    referralUrgency: "Routine guidance",
    priority: 28,
    missingDataFlags: [],
    followUpStatus: "complete",
    followUpDetail: "Guidance documented"
  },
  {
    patientId: "MC-019",
    riskLevel: "high",
    score: 79,
    concern: "Functional impairment and limited support",
    nextAction: "Assign referral owner",
    owner: "Unassigned",
    waiting: "35 min",
    site: "Eldoret county clinic",
    screeningTime: "Today, 09:25",
    screeningTimestamp: 1776763500,
    referralUrgency: "Priority referral coordination",
    priority: 76,
    missingDataFlags: ["Referral destination", "Consent confirmation"],
    followUpStatus: "pending",
    followUpDetail: "Referral owner needed"
  },
  {
    patientId: "MC-021",
    riskLevel: "moderate",
    score: 44,
    concern: "Memory concern with stable mood screen",
    nextAction: "Book cognitive review",
    owner: "Dr. Mwangi",
    waiting: "52 min",
    site: "Nakuru primary care",
    screeningTime: "Today, 09:08",
    screeningTimestamp: 1776762480,
    referralUrgency: "Non-urgent clinical review",
    priority: 47,
    missingDataFlags: ["Functional score"],
    followUpStatus: "scheduled",
    followUpDetail: "Review booked for Friday"
  }
];

export const samplePatientRiskSummary: PatientRiskSummary = {
  displayId: "Patient MC-014",
  age: 42,
  sex: "Female",
  visitType: "Community outreach screening",
  riskLevel: "urgent",
  score: 86,
  confidence: 78,
  summary:
    "Screening responses indicate elevated risk with a safety flag. This result supports urgent clinician review and should be interpreted with the full clinical context.",
  recommendedAction: "Immediate clinician review and crisis pathway check",
  actionRationale:
    "Safety-related responses and functional impairment increase triage priority. The system recommends review before routine follow-up or automated referral closure.",
  triagePriority: "Priority 1",
  triageWindow: "Same day review",
  reviewStatus: "Awaiting clinician",
  assignedTo: "Dr. Achieng",
  site: "Kisumu outreach clinic",
  screener: "Nurse Wanjiku",
  screenedAt: "Today, 09:42",
  modelVersion: "placeholder-rules-v0",
  ruleset: "MVP screening ruleset",
  dataCompleteness: "94%",
  reportStatus: "Draft report not exported",
  audit: {
    screeningId: "SCR-2026-00421-014",
    riskScoreId: "RSK-014-86-U",
    generatedAt: "2026-04-21 09:44 EAT",
    generatedBy: "MindMap Care rules engine",
    lastReviewedAt: "Not yet reviewed",
    lastReviewedBy: "Pending clinician"
  },
  explanation: {
    headline: "The result is driven by safety, function, and persistent distress indicators.",
    detail:
      "The screening rules prioritize any safety flag for human review. Functional impairment and persistent emotional distress increase urgency, but they do not establish a diagnosis.",
    caveats: [
      "This is a screening and triage support output, not a diagnostic conclusion.",
      "Clinical review should consider language, social context, medical history, medications, and current safety.",
      "Low data quality or missing context may change the appropriate referral decision."
    ]
  },
  factors: [
    {
      name: "Safety flag",
      severity: "urgent",
      contribution: "High",
      description: "The screening includes a response requiring urgent human review."
    },
    {
      name: "Functional impairment",
      severity: "high",
      contribution: "Moderate",
      description: "Daily activity limitations were reported across multiple domains."
    },
    {
      name: "Persistent low mood",
      severity: "moderate",
      contribution: "Moderate",
      description: "Symptoms were recorded as present and clinically relevant."
    },
    {
      name: "Follow-up barrier",
      severity: "moderate",
      contribution: "Contextual",
      description: "The screener noted limited support for attending a referral appointment."
    }
  ]
};

export const screeningQuestions: ScreeningQuestion[] = [
  {
    code: "mh-mood",
    label: "Low mood, worry, or emotional distress",
    domain: "mental_health",
    domainLabel: "Mental health",
    defaultValue: "1"
  },
  {
    code: "cg-memory",
    label: "Memory, attention, or confusion concern",
    domain: "cognition",
    domainLabel: "Cognition",
    defaultValue: "0"
  },
  {
    code: "fn-daily",
    label: "Difficulty with daily activities",
    domain: "function",
    domainLabel: "Function",
    defaultValue: "1"
  },
  {
    code: "sf-safety",
    label: "Safety concern requiring urgent review",
    domain: "safety",
    domainLabel: "Safety",
    defaultValue: "0"
  }
];
