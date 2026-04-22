"use client";

import { useEffect, useMemo, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { formatApiError, getDashboardSummary } from "@/lib/api";
import {
  dashboardAlerts,
  dashboardMetrics,
  dashboardRiskMix,
  dashboardTrend,
  facilitySummaries
} from "@/lib/sample-data";
import type { ApiDashboardSummary, DashboardMetric } from "@/lib/types";

const maxScreenings = Math.max(...dashboardTrend.map((row) => row.screenings));
const maxPending = Math.max(...dashboardTrend.map((row) => row.followUpPending));

type LoadState = "loading" | "ready" | "fallback";

export default function DashboardOverviewPage() {
  const [summary, setSummary] = useState<ApiDashboardSummary | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [loadMessage, setLoadMessage] = useState("Fetching dashboard summary from the FastAPI endpoint.");

  useEffect(() => {
    let isMounted = true;

    getDashboardSummary()
      .then((data) => {
        if (!isMounted) {
          return;
        }
        setSummary(data);
        setLoadState("ready");
        setLoadMessage("Dashboard totals are loaded from the FastAPI summary endpoint.");
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }
        setSummary(null);
        setLoadState("fallback");
        setLoadMessage(`Backend summary unavailable: ${formatApiError(error)} Showing placeholder operations data.`);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = useMemo(() => buildDashboardMetrics(summary), [summary]);
  const riskMix = useMemo(
    () =>
      summary
        ? [
            { label: "High risk", value: summary.high_risk_cases, level: "high" as const },
            { label: "Medium risk", value: summary.medium_risk_cases, level: "medium" as const },
            { label: "Low risk", value: summary.low_risk_cases, level: "low" as const }
          ]
        : dashboardRiskMix,
    [summary]
  );

  return (
    <main className="page-stack">
      <div className={`integration-banner ${loadState}`}>
        <strong>
          {loadState === "loading"
            ? "Loading"
            : loadState === "ready"
              ? "Backend connected"
              : "Demo fallback"}
        </strong>
        <span>
          {loadMessage}
        </span>
      </div>

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
        {metrics.map((metric) => (
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
            {riskMix.map((item) => (
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

function buildDashboardMetrics(summary: ApiDashboardSummary | null): DashboardMetric[] {
  if (!summary) {
    return dashboardMetrics;
  }

  return [
    {
      label: "Total screenings",
      value: String(summary.total_screenings),
      detail: "Submitted through the MVP API"
    },
    {
      label: "High risk",
      value: String(summary.high_risk_cases),
      detail: `${summary.urgent_referrals} urgent referrals`
    },
    {
      label: "Medium risk",
      value: String(summary.medium_risk_cases),
      detail: "Needs planned follow-up"
    },
    {
      label: "Low risk",
      value: String(summary.low_risk_cases),
      detail: "Routine guidance or monitoring"
    },
    {
      label: "Follow-up pending",
      value: String(summary.pending_follow_ups),
      detail: `${summary.completed_referrals} referrals completed`
    }
  ];
}
