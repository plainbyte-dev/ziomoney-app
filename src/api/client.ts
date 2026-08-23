import { env } from '@/src/config/env';

import { httpError, networkError } from './errors';

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

/**
 * Minimal JSON fetch wrapper. No auth header, no retry, no refresh —
 * those are handled by higher layers once auth exists.
 */
export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  let response: Response;
  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      ...rest,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (cause) {
    throw networkError(cause);
  }

  if (!response.ok) {
    throw await httpError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
