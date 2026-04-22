import type {
  ApiDashboardSummary,
  ApiPatientRiskSummary,
  ApiTriageQueueItem,
  ScreeningSubmission,
  ScreeningSubmissionResponse
} from "@/lib/types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly detail?: unknown
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

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
    const detail = await readErrorDetail(response);
    throw new ApiRequestError(
      `API request failed with status ${response.status}`,
      response.status,
      detail
    );
  }

  return response.json() as Promise<T>;
}

async function readErrorDetail(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return response.statusText;
  }

  try {
    return await response.json();
  } catch {
    return response.statusText;
  }
}

export function formatApiError(error: unknown) {
  if (error instanceof ApiRequestError) {
    if (
      typeof error.detail === "object" &&
      error.detail !== null &&
      "detail" in error.detail
    ) {
      return String(error.detail.detail);
    }

    return `${error.message}.`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "The API request could not be completed.";
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

export function getTriageQueue() {
  return fetchJson<ApiTriageQueueItem[]>("/api/v1/screenings/triage-queue");
}
