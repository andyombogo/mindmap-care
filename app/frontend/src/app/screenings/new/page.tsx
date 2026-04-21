import { NewScreeningForm } from "@/components/NewScreeningForm";

export default function NewScreeningPage() {
  return (
    <main className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">New screening</p>
          <h1>Capture a structured screening encounter.</h1>
          <p className="lede">
            Capture patient context, assessment domains, clinical notes, and
            referral urgency in a structured workflow for human review.
          </p>
        </div>
      </header>

      <NewScreeningForm />
    </main>
  );
}
