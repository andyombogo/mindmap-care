"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { submitScreening } from "@/lib/api";
import { screeningQuestions } from "@/lib/sample-data";

export function NewScreeningForm() {
  const [status, setStatus] = useState<string>("Draft not submitted");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await submitScreening({
        site_id: "demo-clinic",
        screener_role: "nurse",
        consent_confirmed: true,
        presenting_concerns: ["sample screening"],
        responses: screeningQuestions.map((question) => ({
          code: question.code,
          label: question.label,
          value: question.defaultValue,
          domain: question.domain
        }))
      });
      setStatus("Submitted to API placeholder");
    } catch {
      setStatus("Saved as local draft. Backend connection not available.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="content-grid two-column" onSubmit={handleSubmit}>
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Encounter details</p>
            <h2>Patient and site context</h2>
          </div>
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="site">Facility or site</label>
            <input id="site" name="site" placeholder="Clinic, county, or outreach site" />
          </div>
          <div className="field">
            <label htmlFor="role">Screener role</label>
            <select id="role" name="role" defaultValue="nurse">
              <option value="community_health_worker">Community health worker</option>
              <option value="nurse">Nurse</option>
              <option value="clinician">Clinician</option>
              <option value="researcher">Researcher</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="age">Age</label>
            <input id="age" name="age" inputMode="numeric" placeholder="Years" />
          </div>
          <div className="field">
            <label htmlFor="sex">Sex</label>
            <select id="sex" name="sex" defaultValue="unknown">
              <option value="unknown">Unknown or not recorded</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="intersex">Intersex</option>
            </select>
          </div>
          <div className="field full">
            <label htmlFor="concerns">Presenting concerns</label>
            <textarea
              id="concerns"
              name="concerns"
              placeholder="Briefly capture the person's main concerns or reason for screening."
            />
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Screening domains</p>
            <h2>Sample question set</h2>
          </div>
        </div>

        <div className="choice-grid">
          {screeningQuestions.map((question) => (
            <label className="choice-row" key={question.code}>
              <span>
                <strong className="choice-label">{question.label}</strong>
                <span>{question.domainLabel}</span>
              </span>
              <select defaultValue={question.defaultValue} name={question.code}>
                <option value="0">Not present</option>
                <option value="1">Mild</option>
                <option value="2">Moderate</option>
                <option value="3">Severe</option>
              </select>
            </label>
          ))}
        </div>

        <div className="action-row form-actions">
          <button className="button primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting" : "Submit screening"}
          </button>
          <span className="status-pill">{status}</span>
        </div>
      </section>
    </form>
  );
}
