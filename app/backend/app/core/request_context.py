import logging
from collections.abc import Callable
from uuid import uuid4

from fastapi import HTTPException, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, Response

from app.schemas.errors import ErrorResponse

REQUEST_ID_HEADER = "X-Request-ID"
_LOGGER = logging.getLogger(__name__)


def get_request_id(request: Request) -> str:
    """Return the current request ID, generating a fallback if middleware was bypassed."""
    request_id = getattr(request.state, "request_id", None)
    if isinstance(request_id, str) and request_id:
        return request_id
    return uuid4().hex


async def request_id_middleware(
    request: Request,
    call_next: Callable[[Request], Response],
) -> Response:
    """Attach a stable request ID to each request and response."""
    request_id = _normalise_request_id(request.headers.get(REQUEST_ID_HEADER))
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers[REQUEST_ID_HEADER] = request_id
    return response


async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    """Return HTTP exceptions in the public structured error format."""
    request_id = get_request_id(request)
    message = _stringify_detail(exc.detail)
    return _error_response(
        status_code=exc.status_code,
        code=_http_error_code(exc.status_code),
        message=message,
        request_id=request_id,
        headers=exc.headers,
    )


async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    """Return validation failures without echoing submitted field values."""
    request_id = get_request_id(request)
    return _error_response(
        status_code=422,
        code="validation_error",
        message="Request validation failed.",
        request_id=request_id,
        details=[
            {
                "location": ".".join(str(part) for part in error.get("loc", [])),
                "message": error.get("msg", "Invalid value."),
                "type": error.get("type", "value_error"),
            }
            for error in exc.errors()
        ],
    )


async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Return a safe 500 response while logging the request ID for support."""
    request_id = get_request_id(request)
    _LOGGER.exception("Unhandled request error", extra={"request_id": request_id})
    return _error_response(
        status_code=500,
        code="internal_server_error",
        message="Unexpected server error.",
        request_id=request_id,
    )


def _error_response(
    *,
    status_code: int,
    code: str,
    message: str,
    request_id: str,
    details: list[dict[str, object]] | None = None,
    headers: dict[str, str] | None = None,
) -> JSONResponse:
    response_headers = dict(headers or {})
    response_headers[REQUEST_ID_HEADER] = request_id
    content = ErrorResponse(
        error={
            "code": code,
            "message": message,
            "request_id": request_id,
            "details": details,
        }
    )
    return JSONResponse(
        status_code=status_code,
        content=jsonable_encoder(content),
        headers=response_headers,
    )


def _normalise_request_id(raw_request_id: str | None) -> str:
    if raw_request_id:
        request_id = raw_request_id.strip()
        if 0 < len(request_id) <= 128 and all(char.isprintable() for char in request_id):
            return request_id
    return uuid4().hex


def _http_error_code(status_code: int) -> str:
    if status_code == 404:
        return "not_found"
    if status_code == 401:
        return "unauthorized"
    if status_code == 403:
        return "forbidden"
    if status_code == 409:
        return "conflict"
    if status_code >= 500:
        return "server_error"
    return "request_error"


def _stringify_detail(detail: object) -> str:
    if isinstance(detail, str):
        return detail
    if detail is None:
        return "Request failed."
    return str(detail)
