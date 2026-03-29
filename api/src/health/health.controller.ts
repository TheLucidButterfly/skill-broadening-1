import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '../common/interfaces/health.interface';

@Controller('health')
export class HealthController {
  /**
   * Simple health endpoint used by the UI button.
   * Returns a JSON object matching `HealthCheck`.
   */
  @Get()
  ping(): HealthCheck {
    return { status: 'ok', uptime: process.uptime() };
  }
}
