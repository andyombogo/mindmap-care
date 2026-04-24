import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import DashboardOverviewPage from "@/app/dashboard/page";

vi.mock("@/lib/api", () => ({
  getDashboardSummary: vi.fn(),
  formatApiError: vi.fn(() => "Backend unavailable")
}));

describe("DashboardOverviewPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a workflow empty state when the backend has no screenings yet", async () => {
    const { getDashboardSummary } = await import("@/lib/api");
    vi.mocked(getDashboardSummary).mockResolvedValue({
      total_screenings: 0,
      high_risk_cases: 0,
      medium_risk_cases: 0,
      low_risk_cases: 0,
      urgent_referrals: 0,
      pending_follow_ups: 0,
      completed_referrals: 0,
      risk_distribution: {
        urgent: 0,
        high: 0,
        moderate: 0,
        low: 0
      },
      average_data_quality_score: 0,
      data_complete_records: 0,
      records_with_missing_data: 0,
      most_common_missing_fields: []
    });

    render(<DashboardOverviewPage />);

    expect(await screen.findByText("No submitted screenings yet")).toBeInTheDocument();
    expect(screen.getByText(/there are no completed screenings to summarize/i)).toBeInTheDocument();
  });

  it("renders data completeness indicators from the backend summary", async () => {
    const { getDashboardSummary } = await import("@/lib/api");
    vi.mocked(getDashboardSummary).mockResolvedValue({
      total_screenings: 2,
      high_risk_cases: 1,
      medium_risk_cases: 1,
      low_risk_cases: 0,
      urgent_referrals: 0,
      pending_follow_ups: 1,
      completed_referrals: 1,
      risk_distribution: {
        urgent: 0,
        high: 1,
        moderate: 1,
        low: 0
      },
      average_data_quality_score: 0.88,
      data_complete_records: 1,
      records_with_missing_data: 1,
      most_common_missing_fields: [
        {
          field: "age_years",
          count: 1
        }
      ]
    });

    render(<DashboardOverviewPage />);

    expect(await screen.findByText("Completeness indicators")).toBeInTheDocument();
    expect(screen.getAllByText("88%").length).toBeGreaterThan(0);
    expect(screen.getByText("Age Years")).toBeInTheDocument();
    expect(screen.getByLabelText("1 records missing Age Years")).toBeInTheDocument();
  });
});
