import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { Topics } from '../events/topics';

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';
const TOPIC = Topics.BookingCreated;

interface Projection {
  total: number;
  perDay: Record<string, number>;
}

@Injectable()
export class AnalyticsService implements OnModuleInit {
  private kafka: Kafka;
  private consumer: Consumer | null = null;
  private projection: Projection = { total: 0, perDay: {} };

  async onModuleInit() {
    this.kafka = new Kafka({ brokers: [KAFKA_BROKER] });
    this.consumer = this.kafka.consumer({ groupId: 'analytics-service' });

    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: TOPIC, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          if (!message.value) return;
          try {
            const evt = JSON.parse(message.value.toString());
            this.handleBookingCreated(evt);
          } catch (err) {
            console.warn('AnalyticsService: failed to parse message', err?.message || err);
          }
        },
      });
      console.log('AnalyticsService: subscribed to', TOPIC);
    } catch (err) {
      console.warn('AnalyticsService: failed to start consumer', err?.message || err);
      this.consumer = null;
    }
  }

  handleBookingCreated(event: any) {
    // event should include booking with createdAt
    const booking = event.booking || event;
    this.projection.total += 1;
    const day = booking?.createdAt ? booking.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10);
    this.projection.perDay[day] = (this.projection.perDay[day] || 0) + 1;
  }

  getProjection() {
    return this.projection;
  }
}
