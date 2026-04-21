export type RiskLevel = "low" | "moderate" | "high" | "urgent";

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};

export type RiskMixItem = {
  label: string;
  value: number;
  level: "high" | "medium" | "low";
};

export type DashboardTrendItem = {
  day: string;
  screenings: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  followUpPending: number;
};

export type FacilitySummary = {
  name: string;
  programme: string;
  screenings: number;
  highRisk: number;
  followUpPending: number;
  dataCompleteness: string;
};

export type DashboardAlert = {
  title: string;
  detail: string;
  severity: "critical" | "warning" | "info";
};

export type TriageItem = {
  patientId: string;
  riskLevel: RiskLevel;
  score: number;
  concern: string;
  nextAction: string;
  owner: string;
  waiting: string;
  site: string;
  screeningTime: string;
  screeningTimestamp: number;
  referralUrgency: string;
  priority: number;
  missingDataFlags: string[];
  followUpStatus: "overdue" | "pending" | "scheduled" | "complete";
  followUpDetail: string;
};

export type PatientRiskFactor = {
  name: string;
  severity: RiskLevel;
  description: string;
  contribution: string;
};

export type PatientRiskSummary = {
  displayId: string;
  age: number;
  sex: string;
  visitType: string;
  riskLevel: RiskLevel;
  score: number;
  confidence: number;
  summary: string;
  recommendedAction: string;
  actionRationale: string;
  triagePriority: string;
  triageWindow: string;
  reviewStatus: string;
  assignedTo: string;
  site: string;
  screener: string;
  screenedAt: string;
  modelVersion: string;
  ruleset: string;
  dataCompleteness: string;
  reportStatus: string;
  audit: {
    screeningId: string;
    riskScoreId: string;
    generatedAt: string;
    generatedBy: string;
    lastReviewedAt: string;
    lastReviewedBy: string;
  };
  explanation: {
    headline: string;
    detail: string;
    caveats: string[];
  };
  factors: PatientRiskFactor[];
};

export type ScreeningQuestion = {
  code: string;
  label: string;
  domain: string;
  domainLabel: string;
  defaultValue: string;
};

export type ScreeningSubmission = {
  patient_reference_id?: string;
  site_id: string;
  screener_role: "community_health_worker" | "nurse" | "clinician" | "researcher" | "other";
  age_years?: number;
  sex?: "female" | "male" | "intersex" | "unknown";
  consent_confirmed: boolean;
  presenting_concerns: string[];
  notes?: string;
  responses: Array<{
    code: string;
    label: string;
    value: string | number | boolean | null;
    domain: string;
  }>;
};
