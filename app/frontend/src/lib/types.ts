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
  screeningId?: string;
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
  age: number | string;
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
  requiresHumanReview: boolean;
  missingFields: string[];
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

export type ScreeningSubmissionResponse = {
  screening_id: string;
  status: "accepted";
  received_items: number;
  next_steps: string[];
  risk_score_id: string | null;
  risk_category: RiskLevel | null;
  risk_score: number | null;
  recommended_action: string | null;
  risk_summary_url: string | null;
};

export type ApiRiskSummaryFactor = {
  name: string;
  domain: string;
  direction: string;
  contribution: number;
  description: string;
};

export type ApiPatientRiskSummary = {
  screening_id: string;
  risk_score_id: string;
  patient_reference_id: string | null;
  display_id: string;
  age_years: number | null;
  sex: string;
  site_id: string;
  screener_role: string;
  screened_at: string;
  risk_category: RiskLevel;
  score: number;
  confidence: number;
  recommended_action: string;
  requires_human_review: boolean;
  triage_priority: string;
  triage_window: string;
  summary: string;
  explanation_text: string;
  contributing_factors: ApiRiskSummaryFactor[];
  caveats: string[];
  model_id: string;
  model_version: string;
  generated_at: string;
  data_quality_score: number;
  missing_fields: string[];
  report_status: string;
};

export type ApiDashboardSummary = {
  total_screenings: number;
  high_risk_cases: number;
  medium_risk_cases: number;
  low_risk_cases: number;
  urgent_referrals: number;
  pending_follow_ups: number;
  completed_referrals: number;
  risk_distribution: Record<RiskLevel, number>;
};

export type ApiTriageQueueItem = {
  screening_id: string;
  patient_reference_id: string | null;
  display_id: string;
  site_id: string;
  risk_category: RiskLevel;
  risk_score: number;
  triage_priority: string;
  triage_window: string;
  referral_urgency: string;
  recommended_action: string;
  follow_up_status: TriageItem["followUpStatus"];
  missing_data_flags: string[];
  requires_human_review: boolean;
  screened_at: string;
  owner: string;
  concern_summary: string;
};
