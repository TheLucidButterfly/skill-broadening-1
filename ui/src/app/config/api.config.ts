/**
 * Returns the API base URL based on environment (dev vs prod).
 * - In development (when running on localhost) returns http://localhost:3000
 * - In production returns the current origin (so same origin proxies/hosts work)
 */
export function getApiBase(): string {
  try {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }
    return window.location.origin || '';
  } catch (e) {
    return 'http://localhost:3000';
  }
}
