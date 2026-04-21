import type {
  ApiDashboardSummary,
  ApiPatientRiskSummary,
  ScreeningSubmission,
  ScreeningSubmissionResponse
} from "@/lib/types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getHealthStatus() {
  return fetchJson<{ status: string; service: string }>("/health");
}

export function submitScreening(payload: ScreeningSubmission) {
  return fetchJson<ScreeningSubmissionResponse>("/api/v1/screenings", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getLatestRiskSummary() {
  return fetchJson<ApiPatientRiskSummary>("/api/v1/screenings/risk-summary/latest");
}

export function getRiskSummary(screeningId: string) {
  return fetchJson<ApiPatientRiskSummary>(`/api/v1/screenings/${screeningId}/risk-summary`);
}

export function getDashboardSummary() {
  return fetchJson<ApiDashboardSummary>("/api/v1/dashboard/summary");
}
