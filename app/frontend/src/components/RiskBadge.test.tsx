import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RiskBadge } from "@/components/RiskBadge";

describe("RiskBadge", () => {
  it("renders the urgent risk label with the matching class", () => {
    render(<RiskBadge level="urgent" />);

    const badge = screen.getByText("Urgent");

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("risk-badge", "urgent");
  });

  it("renders moderate risk in clinician-readable language", () => {
    render(<RiskBadge level="moderate" />);

    expect(screen.getByText("Moderate risk")).toBeInTheDocument();
  });
});
