export interface HealthCheck {
  status: 'ok' | 'error';
  uptime: number; // seconds
}
