import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NewScreeningForm } from "@/components/NewScreeningForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}));

vi.mock("@/lib/api", () => ({
  submitScreening: vi.fn()
}));

describe("NewScreeningForm", () => {
  it("renders the core clinical intake sections", () => {
    render(<NewScreeningForm />);

    expect(screen.getByLabelText("Patient identifier")).toBeInTheDocument();
    expect(screen.getByLabelText("Screening date")).toBeInTheDocument();
    expect(screen.getByText("Mental health assessment")).toBeInTheDocument();
    expect(screen.getByText("Cognitive assessment")).toBeInTheDocument();
    expect(screen.getByText("Functional assessment")).toBeInTheDocument();
    expect(screen.getByLabelText("Referral urgency")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit screening" })).toBeInTheDocument();
  });
});
