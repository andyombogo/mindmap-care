import { StatCard } from "@/components/StatCard";
import { dashboardMetrics, dashboardTrend } from "@/lib/sample-data";

export default function DashboardOverviewPage() {
  return (
    <main className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Dashboard overview</p>
          <h1>Operational view of screening and referral activity.</h1>
          <p className="lede">
            A concise view for program leads monitoring caseloads, risk levels,
            referral progress, and follow-up gaps.
          </p>
        </div>
      </header>

      <section className="metric-grid" aria-label="Dashboard metrics">
        {dashboardMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="content-grid two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Seven day trend</p>
              <h2>Screening volume</h2>
            </div>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Screenings</th>
                  <th>High risk</th>
                  <th>Urgent</th>
                </tr>
              </thead>
              <tbody>
                {dashboardTrend.map((row) => (
                  <tr key={row.day}>
                    <td>{row.day}</td>
                    <td>{row.screenings}</td>
                    <td>{row.highRisk}</td>
                    <td>{row.urgent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">Data quality</p>
          <h2>Readiness checks</h2>
          <div className="summary-list">
            <div className="summary-item">
              <span>Missing consent records</span>
              <strong>0</strong>
            </div>
            <div className="summary-item">
              <span>Incomplete screeners</span>
              <strong>3</strong>
            </div>
            <div className="summary-item">
              <span>Records needing review</span>
              <strong>7</strong>
            </div>
            <div className="summary-item">
              <span>Last sync</span>
              <strong>10 min ago</strong>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
