export interface Health {
  status: 'ok' | 'error';
  uptime: number;
}

export type HealthResponse = Health;
