import Link from "next/link";

export default function Home() {
  return (
    <main className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Clinical screening workspace</p>
          <h1>Explainable triage support for care teams.</h1>
          <p className="lede">
            MindMap Care helps frontline teams capture screenings, review risk
            summaries, and prioritize referrals with clear human-readable
            explanations.
          </p>
        </div>
        <div className="hero-actions" aria-label="Primary actions">
          <Link className="button primary" href="/screenings/new">
            New screening
          </Link>
          <Link className="button secondary" href="/triage">
            View queue
          </Link>
        </div>
      </section>

      <section className="metric-grid" aria-label="Today at a glance">
        <article className="metric-card">
          <span className="metric-label">Screenings today</span>
          <strong>24</strong>
          <p>8 completed by community teams</p>
        </article>
        <article className="metric-card">
          <span className="metric-label">High priority</span>
          <strong>5</strong>
          <p>2 urgent reviews pending</p>
        </article>
        <article className="metric-card">
          <span className="metric-label">Referral follow-up</span>
          <strong>72%</strong>
          <p>Completion rate this week</p>
        </article>
      </section>

      <section className="content-grid two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Next clinical actions</p>
              <h2>Priority queue</h2>
            </div>
            <Link href="/triage">Open</Link>
          </div>
          <div className="list-stack">
            <div className="queue-row">
              <span className="risk-dot urgent" />
              <div>
                <strong>Patient MC-014</strong>
                <p>Safety flag present. Immediate review needed.</p>
              </div>
            </div>
            <div className="queue-row">
              <span className="risk-dot high" />
              <div>
                <strong>Patient MC-011</strong>
                <p>High cognitive and functional concern score.</p>
              </div>
            </div>
            <div className="queue-row">
              <span className="risk-dot moderate" />
              <div>
                <strong>Patient MC-008</strong>
                <p>Follow-up visit recommended within 14 days.</p>
              </div>
            </div>
          </div>
        </article>

        <article className="panel accent-panel">
          <p className="eyebrow">Model transparency</p>
          <h2>Every risk result needs context.</h2>
          <p>
            The MVP shell is designed around explainability, human review, and
            referral action rather than opaque scores.
          </p>
          <Link className="button secondary" href="/patients/risk-summary">
            Review sample summary
          </Link>
        </article>
      </section>
    </main>
  );
}
