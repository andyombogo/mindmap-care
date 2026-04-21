import { StatCard } from "@/components/StatCard";
import {
  dashboardAlerts,
  dashboardMetrics,
  dashboardRiskMix,
  dashboardTrend,
  facilitySummaries
} from "@/lib/sample-data";

const maxScreenings = Math.max(...dashboardTrend.map((row) => row.screenings));
const maxPending = Math.max(...dashboardTrend.map((row) => row.followUpPending));

export default function DashboardOverviewPage() {
  return (
    <main className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Dashboard overview</p>
          <h1>Facility operations view for screening and follow-up.</h1>
          <p className="lede">
            A compact view for facility managers and programme leads monitoring
            screening volume, risk distribution, referral pressure, and attention
            areas.
          </p>
        </div>
      </header>

      <section className="dashboard-metric-grid" aria-label="Dashboard metrics">
        {dashboardMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="content-grid two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Recent trend</p>
              <h2>Screenings completed</h2>
            </div>
            <span className="status-pill">7 days</span>
          </div>
          <div className="bar-chart" aria-label="Seven day screening trend">
            {dashboardTrend.map((row) => (
              <div className="bar-row" key={row.day}>
                <span>{row.day}</span>
                <progress
                  aria-label={`${row.screenings} screenings on ${row.day}`}
                  className="bar-track"
                  max={maxScreenings}
                  value={row.screenings}
                />
                <strong>{row.screenings}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Risk mix</p>
              <h2>Current screening categories</h2>
            </div>
          </div>
          <div className="risk-mix">
            {dashboardRiskMix.map((item) => (
              <div className="risk-mix-row" key={item.label}>
                <div>
                  <span className={`risk-dot ${item.level === "medium" ? "moderate" : item.level}`} />
                  <strong>{item.label}</strong>
                </div>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="bar-chart compact-chart" aria-label="Follow-up pending trend">
            {dashboardTrend.map((row) => (
              <div className="bar-row" key={row.day}>
                <span>{row.day}</span>
                <progress
                  aria-label={`${row.followUpPending} pending follow-ups on ${row.day}`}
                  className="bar-track pending"
                  max={maxPending}
                  value={row.followUpPending}
                />
                <strong>{row.followUpPending}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="content-grid two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Facilities and programmes</p>
              <h2>Site summary</h2>
            </div>
          </div>
          <div className="facility-grid">
            {facilitySummaries.map((facility) => (
              <div className="facility-card" key={facility.name}>
                <div>
                  <strong>{facility.name}</strong>
                  <p>{facility.programme}</p>
                </div>
                <div className="facility-stats">
                  <span>
                    <strong>{facility.screenings}</strong>
                    Screenings
                  </span>
                  <span>
                    <strong>{facility.highRisk}</strong>
                    High risk
                  </span>
                  <span>
                    <strong>{facility.followUpPending}</strong>
                    Pending
                  </span>
                  <span>
                    <strong>{facility.dataCompleteness}</strong>
                    Complete
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Attention areas</p>
              <h2>Operational alerts</h2>
            </div>
          </div>
          <div className="alert-list">
            {dashboardAlerts.map((alert) => (
              <div className={`alert-card ${alert.severity}`} key={alert.title}>
                <strong>{alert.title}</strong>
                <p>{alert.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
