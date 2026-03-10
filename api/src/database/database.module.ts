import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Booking } from '../bookings/entities/booking.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST', 'postgres'),
        port: parseInt(config.get('POSTGRES_PORT', '5432')),
        username: config.get('POSTGRES_USER', 'postgres'),
        password: config.get('POSTGRES_PASSWORD', 'postgres'),
        database: config.get('POSTGRES_DB', 'skillbroad'),
        entities: [Booking],
        synchronize: true, // dev convenience
      }),
    }),
  ],
})
export class DatabaseModule {}
