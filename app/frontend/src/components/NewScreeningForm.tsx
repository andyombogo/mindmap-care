"use client";

import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { submitScreening } from "@/lib/api";
import type { ScreeningSubmission } from "@/lib/types";

type ScoreKey =
  | "moodScore"
  | "anxietyScore"
  | "safetyScore"
  | "memoryScore"
  | "orientationScore"
  | "attentionScore"
  | "dailyLivingScore"
  | "mobilityScore"
  | "socialSupportScore";

type FormState = {
  patientId: string;
  age: string;
  sex: "female" | "male" | "intersex" | "unknown" | "";
  screeningDate: string;
  site: string;
  screenerRole: "community_health_worker" | "nurse" | "clinician" | "researcher" | "other";
  mentalHealthNotes: string;
  cognitiveNotes: string;
  functionalNotes: string;
  clinicianNotes: string;
  triageUrgency: "routine" | "priority" | "urgent" | "";
  triageNotes: string;
} & Record<ScoreKey, string>;

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  patientId: "",
  age: "",
  sex: "",
  screeningDate: new Date().toISOString().slice(0, 10),
  site: "",
  screenerRole: "nurse",
  moodScore: "0",
  anxietyScore: "0",
  safetyScore: "0",
  memoryScore: "0",
  orientationScore: "0",
  attentionScore: "0",
  dailyLivingScore: "0",
  mobilityScore: "0",
  socialSupportScore: "0",
  mentalHealthNotes: "",
  cognitiveNotes: "",
  functionalNotes: "",
  clinicianNotes: "",
  triageUrgency: "",
  triageNotes: ""
};

const scoreOptions = [
  { value: "0", label: "0 - Not present" },
  { value: "1", label: "1 - Mild" },
  { value: "2", label: "2 - Moderate" },
  { value: "3", label: "3 - Severe" }
];

const urgencyLabels = {
  routine: "Routine follow-up",
  priority: "Priority referral",
  urgent: "Urgent clinical review"
};

export function NewScreeningForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string>("Draft not saved");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const totalScore = useMemo(() => {
    const scoreKeys: ScoreKey[] = [
      "moodScore",
      "anxietyScore",
      "safetyScore",
      "memoryScore",
      "orientationScore",
      "attentionScore",
      "dailyLivingScore",
      "mobilityScore",
      "socialSupportScore"
    ];

    return scoreKeys.reduce((total, key) => total + Number(form[key]), 0);
  }, [form]);

  const riskPreview = useMemo(() => {
    if (Number(form.safetyScore) >= 2 || form.triageUrgency === "urgent") {
      return "Urgent review";
    }

    if (totalScore >= 15 || form.triageUrgency === "priority") {
      return "Priority referral";
    }

    if (totalScore >= 7) {
      return "Monitor and follow up";
    }

    return "Routine guidance";
  }, [form.safetyScore, form.triageUrgency, totalScore]);

  function updateField(
    key: keyof FormState,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((current) => ({
      ...current,
      [key]: event.target.value
    }));

    setErrors((current) => ({
      ...current,
      [key]: undefined
    }));
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    const age = Number(form.age);

    if (!form.patientId.trim()) {
      nextErrors.patientId = "Patient identifier is required.";
    }

    if (!form.age.trim()) {
      nextErrors.age = "Age is required.";
    } else if (!Number.isInteger(age) || age < 0 || age > 120) {
      nextErrors.age = "Enter a whole number from 0 to 120.";
    }

    if (!form.sex) {
      nextErrors.sex = "Select sex or unknown.";
    }

    if (!form.screeningDate) {
      nextErrors.screeningDate = "Screening date is required.";
    } else if (form.screeningDate > new Date().toISOString().slice(0, 10)) {
      nextErrors.screeningDate = "Screening date cannot be in the future.";
    }

    if (!form.site.trim()) {
      nextErrors.site = "Facility or site is required.";
    }

    if (!form.triageUrgency) {
      nextErrors.triageUrgency = "Select referral urgency.";
    }

    if (
      (form.triageUrgency === "priority" || form.triageUrgency === "urgent") &&
      !form.triageNotes.trim()
    ) {
      nextErrors.triageNotes = "Add triage notes for priority or urgent cases.";
    }

    return nextErrors;
  }

  function buildSubmission(): ScreeningSubmission {
    const mentalHealthSummary = [
      `Mood score: ${form.moodScore}`,
      `Anxiety score: ${form.anxietyScore}`,
      `Safety score: ${form.safetyScore}`,
      form.mentalHealthNotes
    ]
      .filter(Boolean)
      .join("; ");

    const cognitiveSummary = [
      `Memory score: ${form.memoryScore}`,
      `Orientation score: ${form.orientationScore}`,
      `Attention score: ${form.attentionScore}`,
      form.cognitiveNotes
    ]
      .filter(Boolean)
      .join("; ");

    const functionalSummary = [
      `Daily living score: ${form.dailyLivingScore}`,
      `Mobility score: ${form.mobilityScore}`,
      `Social support score: ${form.socialSupportScore}`,
      form.functionalNotes
    ]
      .filter(Boolean)
      .join("; ");

    return {
      patient_reference_id: form.patientId.trim(),
      site_id: form.site.trim(),
      screener_role: form.screenerRole,
      age_years: Number(form.age),
      sex: form.sex || "unknown",
      consent_confirmed: true,
      presenting_concerns: [
        `Screening date: ${form.screeningDate}`,
        mentalHealthSummary,
        cognitiveSummary,
        functionalSummary,
        `Referral urgency: ${form.triageUrgency}`
      ],
      notes: [form.clinicianNotes, form.triageNotes].filter(Boolean).join("\n\n"),
      responses: [
        responseItem("mh-mood", "Low mood or emotional distress", form.moodScore, "mental_health"),
        responseItem("mh-anxiety", "Anxiety or worry", form.anxietyScore, "mental_health"),
        responseItem("mh-safety", "Safety concern", form.safetyScore, "mental_health"),
        responseItem("cg-memory", "Memory concern", form.memoryScore, "cognition"),
        responseItem("cg-orientation", "Orientation concern", form.orientationScore, "cognition"),
        responseItem("cg-attention", "Attention concern", form.attentionScore, "cognition"),
        responseItem("fn-daily", "Daily living difficulty", form.dailyLivingScore, "function"),
        responseItem("fn-mobility", "Mobility difficulty", form.mobilityScore, "function"),
        responseItem("fn-support", "Social support concern", form.socialSupportScore, "function")
      ]
    };
  }

  function saveDraft() {
    setIsSaving(true);
    setStatus("Draft saved locally for review");
    window.localStorage.setItem("mindmap-care-screening-draft", JSON.stringify(form));
    window.setTimeout(() => setIsSaving(false), 350);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("Review required fields before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitScreening(buildSubmission());
      setStatus(`Submitted. Mock risk category: ${response.risk_category ?? "pending"}`);
      window.localStorage.setItem("mindmap-care-last-screening-id", response.screening_id);
      router.push(`/patients/risk-summary?screeningId=${response.screening_id}`);
    } catch {
      setStatus("Submission could not reach API. Draft kept locally.");
      window.localStorage.setItem("mindmap-care-screening-draft", JSON.stringify(form));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="intake-layout" onSubmit={handleSubmit}>
      <section className="panel intake-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Patient details</p>
            <h2>Encounter identifiers</h2>
          </div>
          <span className="status-pill">Structured intake</span>
        </div>

        <div className="form-grid clinical-grid">
          <FieldError error={errors.patientId}>
            <label htmlFor="patientId">Patient identifier</label>
            <input
              aria-invalid={Boolean(errors.patientId)}
              id="patientId"
              name="patientId"
              onChange={(event) => updateField("patientId", event)}
              placeholder="Facility ID, study ID, or clinic number"
              value={form.patientId}
            />
          </FieldError>

          <FieldError error={errors.screeningDate}>
            <label htmlFor="screeningDate">Screening date</label>
            <input
              aria-invalid={Boolean(errors.screeningDate)}
              id="screeningDate"
              name="screeningDate"
              onChange={(event) => updateField("screeningDate", event)}
              type="date"
              value={form.screeningDate}
            />
          </FieldError>

          <FieldError error={errors.age}>
            <label htmlFor="age">Age</label>
            <input
              aria-invalid={Boolean(errors.age)}
              id="age"
              inputMode="numeric"
              name="age"
              onChange={(event) => updateField("age", event)}
              placeholder="Years"
              value={form.age}
            />
          </FieldError>

          <FieldError error={errors.sex}>
            <label htmlFor="sex">Sex</label>
            <select
              aria-invalid={Boolean(errors.sex)}
              id="sex"
              name="sex"
              onChange={(event) => updateField("sex", event)}
              value={form.sex}
            >
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="intersex">Intersex</option>
              <option value="unknown">Unknown or not recorded</option>
            </select>
          </FieldError>

          <FieldError error={errors.site}>
            <label htmlFor="site">Facility or site</label>
            <input
              aria-invalid={Boolean(errors.site)}
              id="site"
              name="site"
              onChange={(event) => updateField("site", event)}
              placeholder="Clinic, ward, outreach site, or county"
              value={form.site}
            />
          </FieldError>

          <div className="field">
            <label htmlFor="screenerRole">Screening completed by</label>
            <select
              id="screenerRole"
              name="screenerRole"
              onChange={(event) => updateField("screenerRole", event)}
              value={form.screenerRole}
            >
              <option value="community_health_worker">Community health worker</option>
              <option value="nurse">Nurse</option>
              <option value="clinician">Clinician</option>
              <option value="researcher">Researcher</option>
              <option value="other">Other clinical staff</option>
            </select>
          </div>
        </div>
      </section>

      <section className="assessment-grid">
        <AssessmentSection
          description="Capture core emotional distress and safety signals."
          fields={[
            ["moodScore", "Low mood or emotional distress"],
            ["anxietyScore", "Anxiety, worry, or agitation"],
            ["safetyScore", "Safety concern or self-harm risk"]
          ]}
          form={form}
          onChange={updateField}
          notesKey="mentalHealthNotes"
          notesLabel="Mental health assessment notes"
          title="Mental health assessment"
        />

        <AssessmentSection
          description="Record observed or reported cognition concerns."
          fields={[
            ["memoryScore", "Memory concern"],
            ["orientationScore", "Orientation or confusion concern"],
            ["attentionScore", "Attention or concentration concern"]
          ]}
          form={form}
          onChange={updateField}
          notesKey="cognitiveNotes"
          notesLabel="Cognitive assessment notes"
          title="Cognitive assessment"
        />

        <AssessmentSection
          description="Document functional limitations and support context."
          fields={[
            ["dailyLivingScore", "Daily living difficulty"],
            ["mobilityScore", "Mobility or self-care difficulty"],
            ["socialSupportScore", "Limited support or follow-up barrier"]
          ]}
          form={form}
          onChange={updateField}
          notesKey="functionalNotes"
          notesLabel="Functional assessment notes"
          title="Functional assessment"
        />
      </section>

      <section className="content-grid two-column">
        <div className="panel intake-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Clinical notes</p>
              <h2>Review context</h2>
            </div>
          </div>

          <div className="field">
            <label htmlFor="clinicianNotes">Clinician notes</label>
            <textarea
              id="clinicianNotes"
              name="clinicianNotes"
              onChange={(event) => updateField("clinicianNotes", event)}
              placeholder="Summarize relevant clinical, social, medication, or contextual information."
              value={form.clinicianNotes}
            />
          </div>
        </div>

        <div className="panel intake-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Referral and triage</p>
              <h2>Next action</h2>
            </div>
            <strong className="triage-preview">{riskPreview}</strong>
          </div>

          <FieldError error={errors.triageUrgency}>
            <label htmlFor="triageUrgency">Referral urgency</label>
            <select
              aria-invalid={Boolean(errors.triageUrgency)}
              id="triageUrgency"
              name="triageUrgency"
              onChange={(event) => updateField("triageUrgency", event)}
              value={form.triageUrgency}
            >
              <option value="">Select urgency</option>
              <option value="routine">{urgencyLabels.routine}</option>
              <option value="priority">{urgencyLabels.priority}</option>
              <option value="urgent">{urgencyLabels.urgent}</option>
            </select>
          </FieldError>

          <FieldError error={errors.triageNotes}>
            <label htmlFor="triageNotes">Referral or triage notes</label>
            <textarea
              aria-invalid={Boolean(errors.triageNotes)}
              id="triageNotes"
              name="triageNotes"
              onChange={(event) => updateField("triageNotes", event)}
              placeholder="Document referral target, escalation reason, follow-up owner, or safety plan."
              value={form.triageNotes}
            />
          </FieldError>
        </div>
      </section>

      <section className="intake-footer" aria-label="Screening actions">
        <div>
          <span className="metric-label">Current score preview</span>
          <strong>{totalScore}/27</strong>
          <p>{status}</p>
        </div>
        <div className="action-row">
          <button
            className="button secondary"
            disabled={isSaving || isSubmitting}
            onClick={saveDraft}
            type="button"
          >
            {isSaving ? "Saving draft" : "Save draft"}
          </button>
          <button className="button primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting screening" : "Submit screening"}
          </button>
        </div>
      </section>
    </form>
  );
}

function responseItem(code: string, label: string, value: string, domain: string) {
  return {
    code,
    label,
    value: Number(value),
    domain
  };
}

type FieldErrorProps = {
  children: ReactNode;
  error?: string;
};

function FieldError({ children, error }: FieldErrorProps) {
  return (
    <div className="field">
      {children}
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}

type AssessmentSectionProps = {
  title: string;
  description: string;
  fields: Array<[ScoreKey, string]>;
  notesKey: keyof FormState;
  notesLabel: string;
  form: FormState;
  onChange: (
    key: keyof FormState,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
};

function AssessmentSection({
  title,
  description,
  fields,
  notesKey,
  notesLabel,
  form,
  onChange
}: AssessmentSectionProps) {
  return (
    <article className="panel intake-card assessment-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Assessment domain</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="clinical-scale">
        {fields.map(([key, label]) => (
          <label className="scale-row" key={key}>
            <span>{label}</span>
            <select onChange={(event) => onChange(key, event)} value={form[key]}>
              {scoreOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="field">
        <label htmlFor={String(notesKey)}>{notesLabel}</label>
        <textarea
          id={String(notesKey)}
          onChange={(event) => onChange(notesKey, event)}
          placeholder="Add brief observations, collateral history, or limitations affecting interpretation."
          value={form[notesKey]}
        />
      </div>
    </article>
  );
}
