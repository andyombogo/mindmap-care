import { NewScreeningForm } from "@/components/NewScreeningForm";

export default function NewScreeningPage() {
  return (
    <main className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">New screening</p>
          <h1>Capture a structured screening encounter.</h1>
          <p className="lede">
            This starter form models the first MVP flow: consent, site context,
            presenting concerns, and a small set of domain questions.
          </p>
        </div>
      </header>

      <NewScreeningForm />
    </main>
  );
}
