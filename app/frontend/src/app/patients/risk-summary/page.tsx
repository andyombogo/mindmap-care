"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiskBadge } from "@/components/RiskBadge";
import { formatApiError, getLatestRiskSummary, getRiskSummary } from "@/lib/api";
import { samplePatientRiskSummary } from "@/lib/sample-data";
import type { ApiPatientRiskSummary, PatientRiskSummary, RiskLevel } from "@/lib/types";

type LoadState = "loading" | "ready" | "fallback" | "error";

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
  const [patient, setPatient] = useState<PatientRiskSummary>(samplePatientRiskSummary);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [message, setMessage] = useState("Loading risk summary from backend.");

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
        setPatient(samplePatientRiskSummary);
        setLoadState("fallback");
        setMessage(`Backend summary unavailable: ${formatApiError(error)} Showing demo placeholder result.`);
      });

    return () => {
      isMounted = false;
    };
  }, [screeningId]);

  const patientAge = useMemo(
    () => (typeof patient.age === "number" ? `${patient.age} years` : patient.age),
    [patient.age]
  );

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
