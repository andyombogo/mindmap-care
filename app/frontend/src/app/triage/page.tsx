import Link from "next/link";
import { RiskBadge } from "@/components/RiskBadge";
import { triageQueue } from "@/lib/sample-data";

export default function TriageQueuePage() {
  return (
    <main className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Triage queue</p>
          <h1>Prioritize cases that need human review.</h1>
          <p className="lede">
            A worklist for supervisors and clinicians to move from screening
            signal to documented action.
          </p>
        </div>
        <Link className="button primary" href="/screenings/new">
          New screening
        </Link>
      </header>

      <section className="panel">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Risk</th>
                <th>Primary concern</th>
                <th>Action</th>
                <th>Owner</th>
                <th>Waiting</th>
              </tr>
            </thead>
            <tbody>
              {triageQueue.map((item) => (
                <tr key={item.patientId}>
                  <td>
                    <strong>{item.patientId}</strong>
                    <p>{item.site}</p>
                  </td>
                  <td>
                    <RiskBadge level={item.riskLevel} />
                  </td>
                  <td>{item.concern}</td>
                  <td>{item.nextAction}</td>
                  <td>{item.owner}</td>
                  <td>{item.waiting}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
