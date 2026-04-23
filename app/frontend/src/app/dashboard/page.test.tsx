import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import DashboardOverviewPage from "@/app/dashboard/page";

vi.mock("@/lib/api", () => ({
  getDashboardSummary: vi.fn(),
  formatApiError: vi.fn(() => "Backend unavailable")
}));

describe("DashboardOverviewPage", () => {
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
      }
    });

    render(<DashboardOverviewPage />);

    expect(await screen.findByText("No submitted screenings yet")).toBeInTheDocument();
    expect(screen.getByText(/there are no completed screenings to summarize/i)).toBeInTheDocument();
  });
});
