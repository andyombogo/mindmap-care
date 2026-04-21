import type { ScreeningSubmission } from "@/lib/types";

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
  return fetchJson<{ screening_id: string; status: string }>(
    "/api/v1/screenings",
    {
      method: "POST",
      body: JSON.stringify(payload)
    }
  );
}

export function getDashboardSummary() {
  return fetchJson("/api/v1/dashboard/summary");
}
