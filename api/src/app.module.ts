import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BookingsModule],
  controllers: [HealthController],
})
export class AppModule {}
