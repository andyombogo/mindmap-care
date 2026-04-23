import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import TriageQueuePage from "@/app/triage/page";

vi.mock("@/lib/api", () => ({
  getTriageQueue: vi.fn(),
  formatApiError: vi.fn(() => "Backend unavailable")
}));

describe("TriageQueuePage", () => {
  it("shows an actionable empty state when the queue has no items", async () => {
    const { getTriageQueue } = await import("@/lib/api");
    vi.mocked(getTriageQueue).mockResolvedValue([]);

    render(<TriageQueuePage />);

    expect(await screen.findByText("No screening results are waiting in the queue")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start the first screening" })).toBeInTheDocument();
  });
});
