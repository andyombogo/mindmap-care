import { RiskBadge } from "@/components/RiskBadge";
import { samplePatientRiskSummary } from "@/lib/sample-data";

export default function PatientRiskSummaryPage() {
  const patient = samplePatientRiskSummary;

  return (
    <main className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Patient risk summary</p>
          <h1>{patient.displayId}</h1>
          <p className="lede">
            Explainable risk summary for clinician review. This sample keeps
            the score visible while foregrounding contributing factors and next
            actions.
          </p>
        </div>
        <RiskBadge level={patient.riskLevel} />
      </header>

      <section className="content-grid three-column">
        <article className="panel">
          <p className="eyebrow">Risk score</p>
          <h2>{patient.score}/100</h2>
          <p>{patient.summary}</p>
        </article>
        <article className="panel">
          <p className="eyebrow">Recommended action</p>
          <h2>{patient.recommendedAction}</h2>
          <p>Confirm clinical context before referral or escalation.</p>
        </article>
        <article className="panel">
          <p className="eyebrow">Review status</p>
          <h2>{patient.reviewStatus}</h2>
          <p>Assigned to {patient.assignedTo}</p>
        </article>
      </section>

      <section className="content-grid two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explanation</p>
              <h2>Top contributing factors</h2>
            </div>
          </div>
          <div className="list-stack">
            {patient.factors.map((factor) => (
              <div className="factor-row" key={factor.name}>
                <span className={`risk-dot ${factor.severity}`} />
                <div>
                  <strong>{factor.name}</strong>
                  <p>{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">Clinical context</p>
          <h2>Screening details</h2>
          <div className="summary-list">
            <div className="summary-item">
              <span>Site</span>
              <strong>{patient.site}</strong>
            </div>
            <div className="summary-item">
              <span>Screener</span>
              <strong>{patient.screener}</strong>
            </div>
            <div className="summary-item">
              <span>Screened</span>
              <strong>{patient.screenedAt}</strong>
            </div>
            <div className="summary-item">
              <span>Model version</span>
              <strong>{patient.modelVersion}</strong>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
