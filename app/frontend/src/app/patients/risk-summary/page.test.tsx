import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import PatientRiskSummaryPage from "@/app/patients/risk-summary/page";
import { ApiRequestError } from "@/lib/api";

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: vi.fn(() => null)
  })
}));

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return {
    ...actual,
    getLatestRiskSummary: vi.fn(),
    getRiskSummary: vi.fn(),
    saveScreeningReview: vi.fn(),
    formatApiError: vi.fn(() => "Backend unavailable")
  };
});

describe("PatientRiskSummaryPage", () => {
  it("shows a no-data state when no screening summaries are available yet", async () => {
    const { getLatestRiskSummary } = await import("@/lib/api");
    vi.mocked(getLatestRiskSummary).mockRejectedValue(
      new ApiRequestError("API request failed with status 404", 404, {
        detail: "No screening summaries yet."
      })
    );

    render(<PatientRiskSummaryPage />);

    expect(await screen.findByText("No patient risk summary has been generated yet")).toBeInTheDocument();
    expect(screen.getByText(/create the first screening/i)).toBeInTheDocument();
  });

  it("renders clinician review and override controls when a summary loads", async () => {
    const { getLatestRiskSummary } = await import("@/lib/api");
    vi.mocked(getLatestRiskSummary).mockResolvedValue({
      screening_id: "scr-123",
      risk_score_id: "risk-123",
      patient_reference_id: "MC-123",
      display_id: "Patient MC-123",
      age_years: 37,
      sex: "female",
      site_id: "kisumu-clinic",
      screener_role: "nurse",
      screened_at: "2026-04-23T09:00:00Z",
      risk_category: "high",
      score: 74,
      confidence: 0.81,
      recommended_action: "Priority referral planning",
      requires_human_review: true,
      triage_priority: "Priority 2",
      triage_window: "Within 24 hours",
      review_status: "Awaiting clinician review",
      assigned_to: "Clinical review queue",
      last_reviewed_at: null,
      last_reviewed_by: null,
      summary: "A high-risk screening output requiring clinician review.",
      explanation_text: "Risk remains elevated because of mood and function indicators.",
      contributing_factors: [
        {
          name: "Mood symptoms",
          domain: "mental_health",
          direction: "increases",
          contribution: 0.46,
          description: "Persistent mood symptoms were reported."
        }
      ],
      caveats: ["Clinical review is still required."],
      model_id: "mock-rules",
      model_version: "v0.1",
      generated_at: "2026-04-23T09:05:00Z",
      data_quality_score: 0.92,
      missing_fields: ["medication_history"],
      report_status: "draft"
    });

    render(<PatientRiskSummaryPage />);

    expect(await screen.findByText("Human sign-off before referral closure")).toBeInTheDocument();
    expect(screen.getByLabelText("Review decision")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save review note" })).toBeInTheDocument();
  });

  it("persists review actions through the backend review endpoint", async () => {
    const { getLatestRiskSummary, saveScreeningReview } = await import("@/lib/api");
    vi.mocked(getLatestRiskSummary).mockResolvedValue({
      screening_id: "scr-123",
      risk_score_id: "risk-123",
      patient_reference_id: "MC-123",
      display_id: "Patient MC-123",
      age_years: 37,
      sex: "female",
      site_id: "kisumu-clinic",
      screener_role: "nurse",
      screened_at: "2026-04-23T09:00:00Z",
      risk_category: "high",
      score: 74,
      confidence: 0.81,
      recommended_action: "Priority referral planning",
      requires_human_review: true,
      triage_priority: "Priority 2",
      triage_window: "Within 24 hours",
      review_status: "Awaiting clinician review",
      assigned_to: "Clinical review queue",
      last_reviewed_at: null,
      last_reviewed_by: null,
      summary: "A high-risk screening output requiring clinician review.",
      explanation_text: "Risk remains elevated because of mood and function indicators.",
      contributing_factors: [
        {
          name: "Mood symptoms",
          domain: "mental_health",
          direction: "increases",
          contribution: 0.46,
          description: "Persistent mood symptoms were reported."
        }
      ],
      caveats: ["Clinical review is still required."],
      model_id: "mock-rules",
      model_version: "v0.1",
      generated_at: "2026-04-23T09:05:00Z",
      data_quality_score: 0.92,
      missing_fields: ["medication_history"],
      report_status: "draft"
    });
    vi.mocked(saveScreeningReview).mockResolvedValue({
      screening_id: "scr-123",
      review_status: "Urgency escalated by clinician",
      assigned_to: "Same-day referral desk",
      note: "Escalated after safety review.",
      audit_event: {
        event_id: "audit-1",
        screening_id: "scr-123",
        event_type: "override_recorded",
        actor: "Same-day referral desk",
        occurred_at: "2026-04-23T09:07:00Z",
        detail: "Clinician escalated the triage urgency. Assigned to Same-day referral desk.",
        metadata: {
          decision: "escalate_urgency",
          assigned_to: "Same-day referral desk",
          note_present: true
        }
      },
      summary: {
        screening_id: "scr-123",
        risk_score_id: "risk-123",
        patient_reference_id: "MC-123",
        display_id: "Patient MC-123",
        age_years: 37,
        sex: "female",
        site_id: "kisumu-clinic",
        screener_role: "nurse",
        screened_at: "2026-04-23T09:00:00Z",
        risk_category: "high",
        score: 74,
        confidence: 0.81,
        recommended_action: "Priority referral planning",
        requires_human_review: true,
        triage_priority: "Priority 2",
        triage_window: "Within 24 hours",
        review_status: "Urgency escalated by clinician",
        assigned_to: "Same-day referral desk",
        last_reviewed_at: "2026-04-23T09:07:00Z",
        last_reviewed_by: "Same-day referral desk",
        summary: "A high-risk screening output requiring clinician review.",
        explanation_text: "Risk remains elevated because of mood and function indicators.",
        contributing_factors: [
          {
            name: "Mood symptoms",
            domain: "mental_health",
            direction: "increases",
            contribution: 0.46,
            description: "Persistent mood symptoms were reported."
          }
        ],
        caveats: ["Clinical review is still required."],
        model_id: "mock-rules",
        model_version: "v0.1",
        generated_at: "2026-04-23T09:05:00Z",
        data_quality_score: 0.92,
        missing_fields: ["medication_history"],
        report_status: "draft"
      }
    });

    render(<PatientRiskSummaryPage />);

    expect(await screen.findByText("Human sign-off before referral closure")).toBeInTheDocument();
    expect(await screen.findByText("Patient MC-123")).toBeInTheDocument();

    const decisionSelect = screen.getByLabelText("Review decision") as HTMLSelectElement;
    fireEvent.change(decisionSelect, {
      target: { value: "escalate_urgency" }
    });
    await waitFor(() => expect(decisionSelect.value).toBe("escalate_urgency"));
    fireEvent.change(screen.getByLabelText("Reviewer or referral owner"), {
      target: { value: "Same-day referral desk" }
    });
    fireEvent.change(screen.getByLabelText("Review note"), {
      target: { value: "Escalated after safety review." }
    });
    fireEvent.click(screen.getByRole("button", { name: "Mark reviewed" }));

    expect(await screen.findByText(/clinician escalated the triage urgency/i)).toBeInTheDocument();
    expect(saveScreeningReview).toHaveBeenCalledWith("scr-123", {
      actor: "Same-day referral desk",
      decision: "escalate_urgency",
      assigned_to: "Same-day referral desk",
      note: "Escalated after safety review."
    });
  });
});
