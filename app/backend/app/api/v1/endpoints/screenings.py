from uuid import uuid4

from fastapi import APIRouter, status

from app.schemas.screening import ScreeningSubmission, ScreeningSubmissionResponse

router = APIRouter(tags=["screenings"])


@router.post("", response_model=ScreeningSubmissionResponse, status_code=status.HTTP_202_ACCEPTED)
def submit_screening(payload: ScreeningSubmission) -> ScreeningSubmissionResponse:
    """Accept a screening submission for future scoring and triage workflows."""
    return ScreeningSubmissionResponse(
        screening_id=str(uuid4()),
        status="accepted",
        received_items=len(payload.responses),
        next_steps=[
            "Store screening record",
            "Run risk scoring workflow",
            "Route result for human review when indicated",
        ],
    )
