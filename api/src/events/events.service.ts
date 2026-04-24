import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { Topics } from './topics';

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';

@Injectable()
export class EventsService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer | null = null;

  async onModuleInit() {
    try {
      this.kafka = new Kafka({ brokers: [KAFKA_BROKER] });
      this.producer = this.kafka.producer();
      await this.producer.connect();
      console.log('EventsService: connected to Kafka broker', KAFKA_BROKER);
    } catch (err) {
      console.warn('EventsService: failed to connect to Kafka, continuing in degraded mode', err?.message || err);
      this.producer = null;
    }
  }

  async emit(topic: Topics, value: any) {
    let serialized: string;
    try {
      serialized = JSON.stringify(value);
    } catch (err) {
      console.error('EventsService: failed to serialize event', err?.message || err);
      return;
    }
    const payload = { value: serialized };
    if (!this.producer) {
      // degraded: log to console
      console.warn('EventsService: producer not connected; event will be logged only', { topic, value });
      return;
    }

    try {
      await this.producer.send({ topic: topic as string, messages: [payload] });
    } catch (err) {
      console.error('EventsService: failed to send message', err?.message || err);
    }
  }

  async onModuleDestroy() {
    if (this.producer) {
      try {
        await this.producer.disconnect();
      } catch (err) {
        // ignore
      }
    }
  }
}
