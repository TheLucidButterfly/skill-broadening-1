import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BookingsModule, EventsModule, AnalyticsModule],
  controllers: [HealthController],
})
export class AppModule {}
