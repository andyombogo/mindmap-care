"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiskBadge } from "@/components/RiskBadge";
import { WorkflowEmptyState } from "@/components/WorkflowEmptyState";
import {
  ApiRequestError,
  formatApiError,
  getLatestRiskSummary,
  getRiskSummary
} from "@/lib/api";
import { samplePatientRiskSummary } from "@/lib/sample-data";
import type { ApiPatientRiskSummary, PatientRiskSummary, RiskLevel } from "@/lib/types";

type LoadState = "loading" | "ready" | "fallback" | "empty" | "notFound";
type ReviewDecision =
  | "Confirm current triage"
  | "Escalate urgency"
  | "Reduce urgency"
  | "Hold for more context";

export default function PatientRiskSummaryPage() {
  return (
    <Suspense fallback={<div className="empty-state">Loading patient risk summary.</div>}>
      <PatientRiskSummaryContent />
    </Suspense>
  );
}

function PatientRiskSummaryContent() {
  const searchParams = useSearchParams();
  const screeningId = searchParams.get("screeningId");
  const [patient, setPatient] = useState<PatientRiskSummary | null>(samplePatientRiskSummary);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [message, setMessage] = useState("Loading risk summary from backend.");
  const [reviewDecision, setReviewDecision] = useState<ReviewDecision>("Confirm current triage");
  const [reviewOwner, setReviewOwner] = useState(samplePatientRiskSummary.assignedTo);
  const [reviewNote, setReviewNote] = useState("");
  const [reviewDraftMessage, setReviewDraftMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const request = screeningId ? getRiskSummary(screeningId) : getLatestRiskSummary();

    request
      .then((summary) => {
        if (!isMounted) {
          return;
        }
        setPatient(mapApiSummaryToPatient(summary));
        setLoadState("ready");
        setMessage("Live mock inference result loaded from backend.");
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }
        if (error instanceof ApiRequestError && error.status === 404) {
          setPatient(null);
          if (screeningId) {
            setLoadState("notFound");
            setMessage("The requested screening summary could not be found.");
          } else {
            setLoadState("empty");
            setMessage("No screening summaries are available yet.");
          }
          return;
        }
        setPatient(samplePatientRiskSummary);
        setLoadState("fallback");
        setMessage(`Backend summary unavailable: ${formatApiError(error)} Showing demo placeholder result.`);
      });

    return () => {
      isMounted = false;
    };
  }, [screeningId]);

  useEffect(() => {
    if (!patient) {
      return;
    }
    setReviewDecision(patient.requiresHumanReview ? "Confirm current triage" : "Hold for more context");
    setReviewOwner(patient.assignedTo);
    setReviewNote("");
    setReviewDraftMessage("");
  }, [patient]);

  const patientAge = useMemo(
    () => (typeof patient?.age === "number" ? `${patient.age} years` : patient?.age ?? "Age not recorded"),
    [patient]
  );

  if (!patient) {
    return (
      <main className="page-stack">
        <div className={`integration-banner ${loadState}`}>
          <strong>{loadState === "notFound" ? "Summary unavailable" : "No summaries yet"}</strong>
          <span>{message}</span>
        </div>

        <WorkflowEmptyState
          title={loadState === "notFound" ? "This screening summary is not available" : "No patient risk summary has been generated yet"}
          description={
            loadState === "notFound"
              ? "The link points to a screening record the backend cannot resolve. Open a newer result from the triage queue or submit a new screening."
              : "Create the first screening to generate a clinician-facing risk summary with explanation, triage guidance, and review status."
          }
          actions={
            loadState === "notFound"
              ? [
                  "Return to the triage queue and open an active case.",
                  "Confirm the screening ID if this link came from an older test record."
                ]
              : [
                  "Submit a new screening from the intake workflow.",
                  "Use seeded demo data if you need a walkthrough-ready example immediately."
                ]
          }
        />
      </main>
    );
  }

  return (
    <main className="page-stack">
      <div className={`integration-banner ${loadState}`}>
        <strong>{loadState === "ready" ? "Connected" : "Demo fallback"}</strong>
        <span>{message}</span>
      </div>

      <header className="risk-summary-header">
        <div>
          <p className="eyebrow">Patient risk summary</p>
          <h1>{patient.displayId}</h1>
          <p className="lede">
            Explainable screening output for clinician review and triage. This
            page does not present a diagnosis and should not replace clinical
            judgment.
          </p>
          <div className="patient-demographics" aria-label="Patient context">
            <span>{patientAge}</span>
            <span>{patient.sex}</span>
            <span>{patient.visitType}</span>
            <span>{patient.site}</span>
          </div>
        </div>

        <div className="risk-header-actions">
          <button className="button secondary" type="button">
            Export report
          </button>
          <RiskBadge level={patient.riskLevel} />
        </div>
      </header>

      <section className="content-grid three-column">
        <article className="panel risk-score-panel">
          <p className="eyebrow">Overall risk category</p>
          <div className="risk-score-lockup">
            <strong>{patient.score}</strong>
            <span>/100</span>
          </div>
          <p>{patient.summary}</p>
          <progress
            aria-label={`Confidence ${patient.confidence}%`}
            className="confidence-bar"
            max={100}
            value={patient.confidence}
          />
          <p className="confidence-copy">Confidence estimate: {patient.confidence}%</p>
        </article>

        <article className="panel">
          <p className="eyebrow">Recommended next action</p>
          <h2>{patient.recommendedAction}</h2>
          <p>{patient.actionRationale}</p>
        </article>

        <article className="panel triage-priority-card">
          <p className="eyebrow">Triage priority</p>
          <h2>{patient.triagePriority}</h2>
          <p>{patient.triageWindow}</p>
          <div className="summary-list compact">
            <div className="summary-item">
              <span>Review status</span>
              <strong>{patient.reviewStatus}</strong>
            </div>
            <div className="summary-item">
              <span>Assigned to</span>
              <strong>{patient.assignedTo}</strong>
            </div>
          </div>
        </article>
      </section>

      <section className="content-grid two-column">
        <article className="panel review-checkpoint-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Clinical review checkpoint</p>
              <h2>Human sign-off before referral closure</h2>
            </div>
            <span className={`status-pill ${patient.requiresHumanReview ? "" : "status-quiet"}`}>
              {patient.requiresHumanReview ? "Human review required" : "Review optional"}
            </span>
          </div>

          <div className="summary-list">
            <div className="summary-item">
              <span>Review owner</span>
              <strong>{patient.assignedTo}</strong>
            </div>
            <div className="summary-item">
              <span>Current status</span>
              <strong>{patient.reviewStatus}</strong>
            </div>
            <div className="summary-item">
              <span>Data gaps</span>
              <strong>
                {patient.missingFields.length > 0 ? patient.missingFields.join(", ") : "No missing fields flagged"}
              </strong>
            </div>
          </div>

          <div className="list-stack review-checklist">
            <div className="timeline-row">
              <span className="risk-dot moderate" />
              <p>Verify the presenting context, language, and collateral history before changing urgency.</p>
            </div>
            <div className="timeline-row">
              <span className="risk-dot moderate" />
              <p>Confirm referral ownership, follow-up timing, and any crisis escalation steps with the care team.</p>
            </div>
          </div>
        </article>

        <article className="panel review-checkpoint-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Override and handoff</p>
              <h2>Capture the clinician disposition</h2>
            </div>
          </div>

          <div className="field">
            <label htmlFor="reviewDecision">Review decision</label>
            <select
              id="reviewDecision"
              onChange={(event) => setReviewDecision(event.target.value as ReviewDecision)}
              value={reviewDecision}
            >
              <option value="Confirm current triage">Confirm current triage</option>
              <option value="Escalate urgency">Escalate urgency</option>
              <option value="Reduce urgency">Reduce urgency</option>
              <option value="Hold for more context">Hold for more context</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="reviewOwner">Reviewer or referral owner</label>
            <input
              id="reviewOwner"
              onChange={(event) => setReviewOwner(event.target.value)}
              value={reviewOwner}
            />
          </div>

          <div className="field">
            <label htmlFor="reviewNote">Review note</label>
            <textarea
              id="reviewNote"
              onChange={(event) => setReviewNote(event.target.value)}
              placeholder="Document the reason for confirming, escalating, or holding this case."
              rows={4}
              value={reviewNote}
            />
          </div>

          <div className="action-row">
            <button
              className="button secondary"
              onClick={() => setReviewDraftMessage("Review note captured for this session.")}
              type="button"
            >
              Save review note
            </button>
            <button
              className="button primary"
              onClick={() =>
                setReviewDraftMessage(
                  `Marked for ${reviewDecision.toLowerCase()} with ${reviewOwner || "an assigned reviewer"}.`
                )
              }
              type="button"
            >
              Mark reviewed
            </button>
          </div>

          <div className="summary-list compact review-draft-summary">
            <div className="summary-item">
              <span>Selected decision</span>
              <strong>{reviewDecision}</strong>
            </div>
            <div className="summary-item">
              <span>Handoff owner</span>
              <strong>{reviewOwner || "Not assigned"}</strong>
            </div>
          </div>

          {reviewDraftMessage ? (
            <div className="review-session-note" role="status">
              {reviewDraftMessage}
            </div>
          ) : null}
        </article>
      </section>

      <section className="content-grid two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Contributing factors</p>
              <h2>Signals behind the triage recommendation</h2>
            </div>
          </div>
          <div className="factor-list">
            {patient.factors.map((factor) => (
              <div className="factor-card" key={`${factor.name}-${factor.description}`}>
                <div>
                  <span className={`risk-dot ${factor.severity}`} />
                  <strong>{factor.name}</strong>
                </div>
                <span className="contribution-pill">{factor.contribution}</span>
                <p>{factor.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel explainability-panel">
          <p className="eyebrow">Explainability panel</p>
          <h2>{patient.explanation.headline}</h2>
          <p>{patient.explanation.detail}</p>
          <div className="clinical-warning">
            This output supports review and triage. It is not a diagnosis.
          </div>
          <div className="list-stack">
            {patient.explanation.caveats.map((caveat) => (
              <div className="timeline-row" key={caveat}>
                <span className="risk-dot moderate" />
                <p>{caveat}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="content-grid two-column">
        <article className="panel">
          <p className="eyebrow">Audit metadata</p>
          <h2>Traceability</h2>
          <div className="summary-list">
            <div className="summary-item">
              <span>Screening ID</span>
              <strong>{patient.audit.screeningId}</strong>
            </div>
            <div className="summary-item">
              <span>Risk score ID</span>
              <strong>{patient.audit.riskScoreId}</strong>
            </div>
            <div className="summary-item">
              <span>Generated at</span>
              <strong>{patient.audit.generatedAt}</strong>
            </div>
            <div className="summary-item">
              <span>Generated by</span>
              <strong>{patient.audit.generatedBy}</strong>
            </div>
            <div className="summary-item">
              <span>Last reviewed</span>
              <strong>{patient.audit.lastReviewedAt}</strong>
            </div>
            <div className="summary-item">
              <span>Reviewed by</span>
              <strong>{patient.audit.lastReviewedBy}</strong>
            </div>
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">Model and report status</p>
          <h2>Screening output details</h2>
          <div className="summary-list">
            <div className="summary-item">
              <span>Model version</span>
              <strong>{patient.modelVersion}</strong>
            </div>
            <div className="summary-item">
              <span>Ruleset</span>
              <strong>{patient.ruleset}</strong>
            </div>
            <div className="summary-item">
              <span>Data completeness</span>
              <strong>{patient.dataCompleteness}</strong>
            </div>
            <div className="summary-item">
              <span>Report status</span>
              <strong>{patient.reportStatus}</strong>
            </div>
            <div className="summary-item">
              <span>Screener</span>
              <strong>{patient.screener}</strong>
            </div>
            <div className="summary-item">
              <span>Screened at</span>
              <strong>{patient.screenedAt}</strong>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

function mapApiSummaryToPatient(summary: ApiPatientRiskSummary): PatientRiskSummary {
  const riskLevel = summary.risk_category as RiskLevel;

  return {
    displayId: summary.display_id,
    age: summary.age_years ?? "Age not recorded",
    sex: titleCase(summary.sex),
    visitType: "Submitted screening",
    riskLevel,
    score: Math.round(summary.score),
    confidence: Math.round(summary.confidence * 100),
    summary: summary.summary,
    recommendedAction: summary.recommended_action,
    actionRationale: summary.explanation_text,
    triagePriority: summary.triage_priority,
    triageWindow: summary.triage_window,
    reviewStatus: summary.requires_human_review ? "Awaiting clinician review" : "Review optional",
    assignedTo: summary.requires_human_review ? "Clinical review queue" : "Facility team",
    requiresHumanReview: summary.requires_human_review,
    missingFields: summary.missing_fields.map(titleCase),
    site: summary.site_id,
    screener: summary.screener_role.replaceAll("_", " "),
    screenedAt: formatDate(summary.screened_at),
    modelVersion: summary.model_version,
    ruleset: summary.model_id,
    dataCompleteness: `${Math.round(summary.data_quality_score * 100)}%`,
    reportStatus: summary.report_status,
    audit: {
      screeningId: summary.screening_id,
      riskScoreId: summary.risk_score_id,
      generatedAt: formatDate(summary.generated_at),
      generatedBy: summary.model_id,
      lastReviewedAt: "Not yet reviewed",
      lastReviewedBy: "Pending clinician"
    },
    explanation: {
      headline: `${titleCase(summary.risk_category)} screening risk requiring ${summary.triage_window.toLowerCase()}.`,
      detail: summary.explanation_text,
      caveats: summary.caveats
    },
    factors: summary.contributing_factors.map((factor) => ({
      name: factor.name,
      severity: riskLevel,
      contribution: `${Math.round(factor.contribution * 100)}%`,
      description: factor.description
    }))
  };
}

function titleCase(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}
