import type { DashboardMetric, PatientRiskSummary, ScreeningQuestion, TriageItem } from "@/lib/types";

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Total screenings",
    value: "148",
    detail: "Across four active facilities"
  },
  {
    label: "High priority",
    value: "17",
    detail: "Needs clinician review or escalation"
  },
  {
    label: "Follow-up complete",
    value: "72%",
    detail: "Documented within target window"
  }
];

export const dashboardTrend = [
  { day: "Mon", screenings: 18, highRisk: 2, urgent: 0 },
  { day: "Tue", screenings: 24, highRisk: 4, urgent: 1 },
  { day: "Wed", screenings: 21, highRisk: 3, urgent: 1 },
  { day: "Thu", screenings: 28, highRisk: 5, urgent: 2 },
  { day: "Fri", screenings: 19, highRisk: 2, urgent: 0 },
  { day: "Sat", screenings: 11, highRisk: 1, urgent: 0 },
  { day: "Sun", screenings: 9, highRisk: 0, urgent: 0 }
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
