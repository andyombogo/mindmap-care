export type RiskLevel = "low" | "moderate" | "high" | "urgent";

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};

export type TriageItem = {
  patientId: string;
  riskLevel: RiskLevel;
  concern: string;
  nextAction: string;
  owner: string;
  waiting: string;
  site: string;
};

export type PatientRiskFactor = {
  name: string;
  severity: RiskLevel;
  description: string;
};

export type PatientRiskSummary = {
  displayId: string;
  riskLevel: RiskLevel;
  score: number;
  summary: string;
  recommendedAction: string;
  reviewStatus: string;
  assignedTo: string;
  site: string;
  screener: string;
  screenedAt: string;
  modelVersion: string;
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
  site_id: string;
  screener_role: "community_health_worker" | "nurse" | "clinician" | "researcher" | "other";
  consent_confirmed: boolean;
  presenting_concerns: string[];
  responses: Array<{
    code: string;
    label: string;
    value: string | number | boolean | null;
    domain: string;
  }>;
};
