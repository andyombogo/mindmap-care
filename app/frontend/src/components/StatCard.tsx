type StatCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <article className="metric-card">
      <span className="metric-label">{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}
