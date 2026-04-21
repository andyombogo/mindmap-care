const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">MindMap Care</p>
        <h1>Care navigation, thoughtfully mapped.</h1>
        <p className="lede">
          A clean starter interface for care teams, patient journeys, and operational workflows.
        </p>
        <div className="status-grid" aria-label="Local development status">
          <div>
            <span>Frontend</span>
            <strong>Next.js + TypeScript</strong>
          </div>
          <div>
            <span>Backend</span>
            <strong>{apiBaseUrl}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
