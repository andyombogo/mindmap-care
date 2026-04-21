import type { RiskLevel } from "@/lib/types";

type RiskBadgeProps = {
  level: RiskLevel;
};

const labels: Record<RiskLevel, string> = {
  low: "Low risk",
  moderate: "Moderate risk",
  high: "High risk",
  urgent: "Urgent"
};

export function RiskBadge({ level }: RiskBadgeProps) {
  return <span className={`risk-badge ${level}`}>{labels[level]}</span>;
}
