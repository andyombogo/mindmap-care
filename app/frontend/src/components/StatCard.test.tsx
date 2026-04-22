import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatCard } from "@/components/StatCard";

describe("StatCard", () => {
  it("renders a labelled dashboard metric", () => {
    render(
      <StatCard
        detail="Needs clinician review"
        label="High risk"
        value="12"
      />
    );

    expect(screen.getByText("High risk")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Needs clinician review")).toBeInTheDocument();
  });
});
