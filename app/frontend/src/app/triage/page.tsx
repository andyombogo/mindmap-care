"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { RiskBadge } from "@/components/RiskBadge";
import { formatApiError, getTriageQueue } from "@/lib/api";
import { triageQueue } from "@/lib/sample-data";
import type { ApiTriageQueueItem, RiskLevel, TriageItem } from "@/lib/types";

type SortKey = "priority" | "screeningTime" | "riskLevel" | "followUpStatus";
type RiskFilter = RiskLevel | "all";
type FollowUpFilter = TriageItem["followUpStatus"] | "all";
type LoadState = "loading" | "ready" | "fallback";

const riskRank: Record<RiskLevel, number> = {
  urgent: 4,
  high: 3,
  moderate: 2,
  low: 1
};

const followUpRank: Record<TriageItem["followUpStatus"], number> = {
  overdue: 4,
  pending: 3,
  scheduled: 2,
  complete: 1
};

export default function TriageQueuePage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [followUpFilter, setFollowUpFilter] = useState<FollowUpFilter>("all");
  const [showMissingOnly, setShowMissingOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("priority");
  const [queueItems, setQueueItems] = useState<TriageItem[]>(triageQueue);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [loadMessage, setLoadMessage] = useState("Loading the clinician worklist from the FastAPI demo endpoint.");

  useEffect(() => {
    let isMounted = true;

    getTriageQueue()
      .then((items) => {
        if (!isMounted) {
          return;
        }
        setQueueItems(items.map(mapApiTriageItem));
        setLoadState("ready");
        setLoadMessage("Queue loaded from seeded synthetic demo screenings.");
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }
        setQueueItems(triageQueue);
        setLoadState("fallback");
        setLoadMessage(`Backend queue unavailable: ${formatApiError(error)} Showing static demo queue.`);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return queueItems
      .filter((item) => {
        const matchesSearch =
          !normalizedSearch ||
          [
            item.patientId,
            item.site,
            item.concern,
            item.owner,
            item.nextAction,
            item.referralUrgency
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesRisk = riskFilter === "all" || item.riskLevel === riskFilter;
        const matchesFollowUp =
          followUpFilter === "all" || item.followUpStatus === followUpFilter;
        const matchesMissing =
          !showMissingOnly || item.missingDataFlags.length > 0;

        return matchesSearch && matchesRisk && matchesFollowUp && matchesMissing;
      })
      .sort((a, b) => compareTriageItems(a, b, sortKey));
  }, [followUpFilter, queueItems, riskFilter, search, showMissingOnly, sortKey]);

  const urgentCount = queueItems.filter((item) => item.riskLevel === "urgent").length;
  const missingDataCount = queueItems.filter(
    (item) => item.missingDataFlags.length > 0
  ).length;
  const overdueCount = queueItems.filter(
    (item) => item.followUpStatus === "overdue"
  ).length;

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
        <span>{loadMessage}</span>
      </div>

      <header className="page-header">
        <div>
          <p className="eyebrow">Triage queue</p>
          <h1>Prioritize cases that need human review.</h1>
          <p className="lede">
            Operational worklist for clinicians to sort new screening results,
            confirm urgency, and move cases toward referral or follow-up.
          </p>
        </div>
        <Link className="button primary" href="/screenings/new">
          New screening
        </Link>
      </header>

      <section className="metric-grid" aria-label="Triage queue status">
        <article className="metric-card">
          <span className="metric-label">Urgent reviews</span>
          <strong>{urgentCount}</strong>
          <p>Needs same-day human review</p>
        </article>
        <article className="metric-card">
          <span className="metric-label">Missing data</span>
          <strong>{missingDataCount}</strong>
          <p>Records with fields to resolve</p>
        </article>
        <article className="metric-card">
          <span className="metric-label">Follow-up overdue</span>
          <strong>{overdueCount}</strong>
          <p>Requires operational action</p>
        </article>
      </section>

      <section className="panel queue-controls" aria-label="Queue filters">
        <div className="field queue-search">
          <label htmlFor="triageSearch">Search queue</label>
          <input
            id="triageSearch"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Patient ID, site, concern, owner, action"
            value={search}
          />
        </div>

        <div className="field">
          <label htmlFor="riskFilter">Risk category</label>
          <select
            id="riskFilter"
            onChange={(event) => setRiskFilter(event.target.value as RiskFilter)}
            value={riskFilter}
          >
            <option value="all">All risks</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="followUpFilter">Follow-up status</label>
          <select
            id="followUpFilter"
            onChange={(event) =>
              setFollowUpFilter(event.target.value as FollowUpFilter)
            }
            value={followUpFilter}
          >
            <option value="all">All statuses</option>
            <option value="overdue">Overdue</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <label className="queue-toggle">
          <input
            checked={showMissingOnly}
            onChange={(event) => setShowMissingOnly(event.target.checked)}
            type="checkbox"
          />
          Missing data only
        </label>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Active worklist</p>
            <h2>{filteredItems.length} cases shown</h2>
          </div>
          <span className="status-pill">Sorted by {sortLabel(sortKey)}</span>
        </div>

        <div className="table-wrap">
          <table className="data-table triage-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>
                  <SortButton active={sortKey === "riskLevel"} onClick={() => setSortKey("riskLevel")}>
                    Risk
                  </SortButton>
                </th>
                <th>
                  <SortButton active={sortKey === "screeningTime"} onClick={() => setSortKey("screeningTime")}>
                    Screening time
                  </SortButton>
                </th>
                <th>
                  <SortButton active={sortKey === "priority"} onClick={() => setSortKey("priority")}>
                    Referral urgency
                  </SortButton>
                </th>
                <th>Missing data</th>
                <th>
                  <SortButton active={sortKey === "followUpStatus"} onClick={() => setSortKey("followUpStatus")}>
                    Follow-up
                  </SortButton>
                </th>
                <th>Owner</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.patientId}>
                  <td>
                    <strong>{item.patientId}</strong>
                    <p>{item.site}</p>
                    <p>{item.concern}</p>
                  </td>
                  <td>
                    <RiskBadge level={item.riskLevel} />
                  </td>
                  <td>
                    <strong>{item.screeningTime}</strong>
                    <p>{item.waiting}</p>
                  </td>
                  <td>
                    <span className={`priority-badge ${priorityClass(item.priority)}`}>
                      {item.referralUrgency}
                    </span>
                    <p>{item.nextAction}</p>
                  </td>
                  <td>
                    {item.missingDataFlags.length > 0 ? (
                      <div className="flag-list">
                        {item.missingDataFlags.map((flag) => (
                          <span className="data-flag" key={flag}>
                            {flag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="status-indicator complete">Complete</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-indicator ${item.followUpStatus}`}>
                      {followUpLabel(item.followUpStatus)}
                    </span>
                    <p>{item.followUpDetail}</p>
                  </td>
                  <td>{item.owner}</td>
                  <td>
                    <Link
                      className="button secondary table-action"
                      href={
                        item.screeningId
                          ? `/patients/risk-summary?screeningId=${item.screeningId}`
                          : "/patients/risk-summary"
                      }
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 ? (
          <div className="empty-state">No cases match the current filters.</div>
        ) : null}
      </section>
    </main>
  );
}

function compareTriageItems(a: TriageItem, b: TriageItem, sortKey: SortKey) {
  if (sortKey === "riskLevel") {
    return riskRank[b.riskLevel] - riskRank[a.riskLevel];
  }

  if (sortKey === "screeningTime") {
    return b.screeningTimestamp - a.screeningTimestamp;
  }

  if (sortKey === "followUpStatus") {
    return followUpRank[b.followUpStatus] - followUpRank[a.followUpStatus];
  }

  return b.priority - a.priority;
}

function sortLabel(sortKey: SortKey) {
  const labels: Record<SortKey, string> = {
    priority: "priority",
    screeningTime: "screening time",
    riskLevel: "risk category",
    followUpStatus: "follow-up status"
  };

  return labels[sortKey];
}

type SortButtonProps = {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
};

function SortButton({ active, children, onClick }: SortButtonProps) {
  return (
    <button className={`sort-button ${active ? "active" : ""}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}

function priorityClass(priority: number) {
  if (priority >= 90) {
    return "critical";
  }

  if (priority >= 70) {
    return "elevated";
  }

  return "routine";
}

function followUpLabel(status: TriageItem["followUpStatus"]) {
  const labels: Record<TriageItem["followUpStatus"], string> = {
    overdue: "Overdue",
    pending: "Pending",
    scheduled: "Scheduled",
    complete: "Complete"
  };

  return labels[status];
}

function mapApiTriageItem(item: ApiTriageQueueItem): TriageItem {
  const screenedAt = new Date(item.screened_at);
  const screeningTimestamp = Number.isNaN(screenedAt.getTime())
    ? 0
    : screenedAt.getTime();

  return {
    screeningId: item.screening_id,
    patientId: item.display_id,
    riskLevel: item.risk_category,
    score: Math.round(item.risk_score),
    concern: item.concern_summary,
    nextAction: item.recommended_action,
    owner: item.owner,
    waiting: item.triage_window,
    site: titleCase(item.site_id),
    screeningTime: formatDate(item.screened_at),
    screeningTimestamp,
    referralUrgency: titleCase(item.referral_urgency),
    priority: priorityFromRisk(item.risk_category, item.risk_score),
    missingDataFlags: item.missing_data_flags.map(titleCase),
    followUpStatus: item.follow_up_status,
    followUpDetail: item.requires_human_review
      ? "Human review required before closure"
      : "Review according to local workflow"
  };
}

function priorityFromRisk(riskLevel: RiskLevel, score: number) {
  const basePriority: Record<RiskLevel, number> = {
    urgent: 90,
    high: 75,
    moderate: 50,
    low: 20
  };

  return Math.min(100, basePriority[riskLevel] + Math.round(score / 10));
}

function titleCase(value: string) {
  return value
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}
