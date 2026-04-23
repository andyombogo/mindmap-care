"use client";

import type { ReactNode } from "react";

type WorkflowEmptyStateProps = {
  title: string;
  description: string;
  actions?: string[];
  children?: ReactNode;
};

export function WorkflowEmptyState({
  title,
  description,
  actions = [],
  children
}: WorkflowEmptyStateProps) {
  return (
    <div className="empty-state workflow-empty-state">
      <div>
        <strong className="workflow-empty-title">{title}</strong>
        <p className="workflow-empty-description">{description}</p>
      </div>

      {actions.length > 0 ? (
        <ul className="workflow-empty-actions">
          {actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      ) : null}

      {children ? <div className="workflow-empty-footer">{children}</div> : null}
    </div>
  );
}
