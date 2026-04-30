# Mock Scoring Rules

MindMap Care currently uses deterministic mock rules for development, demos, and API contract testing. These rules are not clinical evidence and must not be interpreted as diagnostic or predictive performance.

## Score Construction

The mock engine produces a `0` to `100` score using:

```text
score = positive_domain_total * 8
      + safety_boost
      + missing_data_penalty
```

- `positive_domain_total`: sum of non-negative numeric screening response values by domain.
- `safety_boost`: `35` when any safety flag is present, otherwise `0`.
- `missing_data_penalty`: `2` points per missing field, capped at `10`.
- Final score is rounded to one decimal place and capped at `100`.

## Triage Thresholds

| Category | Score rule | Human review |
| --- | --- | --- |
| Low | `0` to `<35` | No |
| Moderate | `35` to `<70` | No |
| High | `70` to `<85` | Yes |
| Urgent | `85` to `100`, or any safety flag | Yes |

Safety flags always force urgent triage, even when the numeric score is lower.

## Confidence

The mock confidence score is a workflow signal, not statistical certainty:

- `75%` comes from data quality.
- `25%` comes from the number of captured features, capped at eight features.
- Missing age, unknown sex, and missing response values reduce data quality.

## Explainability

The mock explanation shows:

- highest contributing domains first
- a safety factor when safety logic fired
- a missing data factor when required context is incomplete
- non-diagnostic caveats for clinician review

## Fixture Expectations

The backend test suite locks representative fixture outputs:

| Fixture | Domain total | Safety flag | Expected category |
| --- | ---: | --- | --- |
| Low | `2` | No | Low |
| Moderate | `5` | No | Moderate |
| High | `9` | No | High |
| Urgent | `11` | No | Urgent |

These fixtures keep demo behavior stable while the product workflow matures toward validated models.
