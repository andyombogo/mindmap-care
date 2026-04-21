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
    concern: "Safety flag and severe distress",
    nextAction: "Immediate clinician review",
    owner: "Dr. Achieng",
    waiting: "18 min",
    site: "Kisumu outreach clinic"
  },
  {
    patientId: "MC-011",
    riskLevel: "high",
    concern: "Cognitive and functional decline",
    nextAction: "Referral planning",
    owner: "Nurse Wanjiku",
    waiting: "2 hr",
    site: "Nairobi primary care"
  },
  {
    patientId: "MC-008",
    riskLevel: "moderate",
    concern: "Low mood and follow-up gap",
    nextAction: "Schedule follow-up",
    owner: "CHW Otieno",
    waiting: "1 day",
    site: "Community visit"
  },
  {
    patientId: "MC-006",
    riskLevel: "low",
    concern: "Routine screening",
    nextAction: "Provide guidance",
    owner: "Clinic team",
    waiting: "2 days",
    site: "Mombasa clinic"
  }
];

export const samplePatientRiskSummary: PatientRiskSummary = {
  displayId: "Patient MC-014",
  riskLevel: "urgent",
  score: 86,
  summary:
    "Screening responses indicate acute distress with a safety flag. Review is required before any routine workflow step.",
  recommendedAction: "Immediate review",
  reviewStatus: "Awaiting clinician",
  assignedTo: "Dr. Achieng",
  site: "Kisumu outreach clinic",
  screener: "Nurse Wanjiku",
  screenedAt: "Today, 09:42",
  modelVersion: "placeholder-rules-v0",
  factors: [
    {
      name: "Safety flag",
      severity: "urgent",
      description: "The screening includes a response requiring urgent human review."
    },
    {
      name: "Functional impairment",
      severity: "high",
      description: "Daily activity limitations were reported across multiple domains."
    },
    {
      name: "Persistent low mood",
      severity: "moderate",
      description: "Symptoms were recorded as present and clinically relevant."
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
