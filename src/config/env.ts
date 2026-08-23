// Public runtime config only. EXPO_PUBLIC_* variables are inlined into the
// client bundle at build time, so nothing secret may live behind this prefix.

function getApiUrl(): string {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      'Missing EXPO_PUBLIC_API_URL. Set it in a .env file (see .env.example).'
    );
  }

  return apiUrl;
}

export const env = {
  apiUrl: getApiUrl(),
} as const;
