export type ApiErrorKind = 'http' | 'network';

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(params: {
    kind: ApiErrorKind;
    message: string;
    status?: number;
    code?: string;
    details?: unknown;
  }) {
    super(params.message);
    this.name = 'ApiError';
    this.kind = params.kind;
    this.status = params.status;
    this.code = params.code;
    this.details = params.details;
  }
}

/** A request that never reached the server (offline, timeout, DNS, etc.). */
export function networkError(cause: unknown): ApiError {
  return new ApiError({
    kind: 'network',
    message: 'Unable to reach the server. Check your connection and try again.',
    details: cause,
  });
}

/**
 * A response was received but the status was not 2xx. Makes no assumption
 * about the backend's error-body shape beyond optionally reading
 * `message`/`code` if present; the raw parsed body is always kept in `details`.
 */
export async function httpError(response: Response): Promise<ApiError> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = undefined;
  }

  const message =
    (isRecord(body) && typeof body.message === 'string' && body.message) ||
    `Request failed with status ${response.status}`;
  const code = isRecord(body) && typeof body.code === 'string' ? body.code : undefined;

  return new ApiError({
    kind: 'http',
    message,
    status: response.status,
    code,
    details: body,
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
