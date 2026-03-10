import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, logLevel } from 'kafkajs';

@Injectable()
export class EventsService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: any;

  constructor(private config: ConfigService) {
    const broker = this.config.get('KAFKA_BROKER', 'redpanda:9092');
    this.kafka = new Kafka({
      clientId: 'skill-broad-api',
      brokers: [broker],
      logLevel: logLevel.NOTHING,
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      console.log('Events producer connected');
    } catch (err) {
      console.warn('Could not connect producer at startup', err.message || err);
    }
  }

  async onModuleDestroy() {
    try {
      await this.producer.disconnect();
    } catch (err) {
      // ignore
    }
  }

  async publish(topic: string, msg: any) {
    // Topic naming: keep simple; caller passes the event name
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(msg) }],
      });
    } catch (err) {
      console.error('Failed to publish event', err.message || err);
    }
  }
}
